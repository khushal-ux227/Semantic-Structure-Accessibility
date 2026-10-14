import {
  GeoLocationResult,
  WeatherData,
  UnitsMode,
  WeatherApiError,
  HourlyForecastItem,
  DailyForecastItem,
  AirQualityData
} from '../types/weather';
import { parseAqiCategory } from '../utils/weatherCodes';

const GEOCODING_BASE_URL = 'https://geocoding-api.open-meteo.com/v1/search';
const FORECAST_BASE_URL = 'https://api.open-meteo.com/v1/forecast';
const AIR_QUALITY_BASE_URL = 'https://air-quality-api.open-meteo.com/v1/air-quality';

/**
 * Searches for cities matching a text query using the geocoding REST endpoint
 */
export async function searchCities(
  query: string,
  signal?: AbortSignal
): Promise<GeoLocationResult[]> {
  const trimmed = query.trim();
  if (!trimmed || trimmed.length < 2) {
    return [];
  }

  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    throw createApiError(
      'NETWORK',
      'Offline',
      'Your browser appears to be offline. Please verify your internet connection.'
    );
  }

  const endpoint = `${GEOCODING_BASE_URL}?name=${encodeURIComponent(trimmed)}&count=8&language=en&format=json`;

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      signal,
    });

    if (!response.ok) {
      throw createApiError(
        'NETWORK',
        'Geocoding Service Error',
        `Failed to search cities. Server responded with status HTTP ${response.status}.`,
        response.status
      );
    }

    const data = await response.json();

    if (!data.results || !Array.isArray(data.results)) {
      return [];
    }

    return data.results.map((item: any) => ({
      id: item.id,
      name: item.name,
      latitude: item.latitude,
      longitude: item.longitude,
      elevation: item.elevation,
      country_code: item.country_code,
      country: item.country,
      admin1: item.admin1,
      timezone: item.timezone,
    }));
  } catch (err: any) {
    if (err.name === 'AbortError') {
      throw createApiError('ABORT', 'Request Cancelled', 'Search request was cancelled.');
    }
    if (err.type) {
      throw err;
    }
    throw createApiError(
      'NETWORK',
      'Network Connection Failed',
      'Unable to reach geocoding REST service. Check your connection and try again.'
    );
  }
}

/**
 * Fetches comprehensive real-time forecast and air quality data for specific coordinates
 */
export async function fetchWeatherForCoordinates(
  lat: number,
  lon: number,
  units: UnitsMode,
  locationInfo: GeoLocationResult,
  signal?: AbortSignal
): Promise<WeatherData> {
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    throw createApiError(
      'NETWORK',
      'Offline',
      'Your browser appears to be offline. Please check your network connection.'
    );
  }

  const startTime = performance.now();

  const unitParams =
    units === 'imperial'
      ? '&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch'
      : '';

  const forecastUrl = `${FORECAST_BASE_URL}?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,cloud_cover,pressure_msl,wind_speed_10m,wind_direction_10m,wind_gusts_10m,uv_index&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation_probability,weather_code,wind_speed_10m,uv_index&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,precipitation_sum,precipitation_probability_max,wind_speed_10m_max,wind_direction_10m_dominant&timezone=auto${unitParams}`;

  const airQualityUrl = `${AIR_QUALITY_BASE_URL}?latitude=${lat}&longitude=${lon}&current=us_aqi,pm2_5,pm10,ozone,nitrogen_dioxide,sulphur_dioxide,carbon_monoxide`;

  try {
    // Execute both forecast and air quality REST requests asynchronously in parallel
    const [forecastResponse, airQualityResponse] = await Promise.all([
      fetch(forecastUrl, {
        method: 'GET',
        headers: { Accept: 'application/json' },
        signal,
      }),
      fetch(airQualityUrl, {
        method: 'GET',
        headers: { Accept: 'application/json' },
        signal,
      }).catch(() => null), // Graceful degradation if air quality endpoint fails
    ]);

    if (!forecastResponse.ok) {
      throw createApiError(
        'NETWORK',
        'Forecast API Error',
        `Open-Meteo returned status ${forecastResponse.status} (${forecastResponse.statusText})`,
        forecastResponse.status
      );
    }

    const forecastJson = await forecastResponse.json();
    let airQualityJson: any = null;
    if (airQualityResponse && airQualityResponse.ok) {
      try {
        airQualityJson = await airQualityResponse.json();
      } catch {
        airQualityJson = null;
      }
    }

    const latency = Math.round(performance.now() - startTime);

    // Validate complex nested structures
    if (!forecastJson.current || !forecastJson.hourly || !forecastJson.daily) {
      throw createApiError(
        'PARSING',
        'Malformed JSON Payload',
        'Weather response did not contain the expected current, hourly, and daily metrics.'
      );
    }

    // Parse current conditions
    const current = {
      temperature: Math.round(forecastJson.current.temperature_2m),
      apparentTemperature: Math.round(forecastJson.current.apparent_temperature),
      humidity: Math.round(forecastJson.current.relative_humidity_2m),
      windSpeed: Math.round(forecastJson.current.wind_speed_10m),
      windDirection: Math.round(forecastJson.current.wind_direction_10m || 0),
      windGusts: Math.round(forecastJson.current.wind_gusts_10m || 0),
      pressure: Math.round(forecastJson.current.pressure_msl || 1013),
      uvIndex: Number((forecastJson.current.uv_index || 0).toFixed(1)),
      weatherCode: forecastJson.current.weather_code,
      isDay: Boolean(forecastJson.current.is_day),
      precipitation: Number((forecastJson.current.precipitation || 0).toFixed(1)),
      cloudCover: Math.round(forecastJson.current.cloud_cover || 0),
    };

    // Parse next 24 hourly forecast points
    const hourlyTimes: string[] = forecastJson.hourly.time || [];
    const nowIso = new Date().toISOString();
    // Find index closest to now
    let startIndex = hourlyTimes.findIndex((t) => t >= nowIso.slice(0, 13));
    if (startIndex === -1) startIndex = 0;
    const next24Slice = hourlyTimes.slice(startIndex, startIndex + 24);

    const hourly: HourlyForecastItem[] = next24Slice.map((isoTime, i) => {
      const actualIdx = startIndex + i;
      const dateObj = new Date(isoTime);
      const timeStr = dateObj.toLocaleTimeString([], { hour: 'numeric', hour12: true });

      return {
        time: i === 0 ? 'Now' : timeStr,
        isoTime,
        temperature: Math.round(forecastJson.hourly.temperature_2m[actualIdx] ?? current.temperature),
        apparentTemperature: Math.round(forecastJson.hourly.apparent_temperature[actualIdx] ?? current.apparentTemperature),
        humidity: Math.round(forecastJson.hourly.relative_humidity_2m[actualIdx] ?? 50),
        precipitationProbability: Math.round(forecastJson.hourly.precipitation_probability[actualIdx] ?? 0),
        weatherCode: forecastJson.hourly.weather_code[actualIdx] ?? 0,
        windSpeed: Math.round(forecastJson.hourly.wind_speed_10m[actualIdx] ?? current.windSpeed),
        uvIndex: Number((forecastJson.hourly.uv_index?.[actualIdx] ?? 0).toFixed(1)),
      };
    });

    // Parse 7-day daily forecast
    const dailyTimes: string[] = forecastJson.daily.time || [];
    const daily: DailyForecastItem[] = dailyTimes.map((isoDate, idx) => {
      const dateObj = new Date(`${isoDate}T00:00:00`);
      const dayName =
        idx === 0
          ? 'Today'
          : idx === 1
          ? 'Tomorrow'
          : dateObj.toLocaleDateString([], { weekday: 'short' });
      const formattedDate = dateObj.toLocaleDateString([], { month: 'short', day: 'numeric' });

      return {
        date: formattedDate,
        isoDate,
        dayName,
        weatherCode: forecastJson.daily.weather_code[idx] ?? 0,
        maxTemp: Math.round(forecastJson.daily.temperature_2m_max[idx]),
        minTemp: Math.round(forecastJson.daily.temperature_2m_min[idx]),
        precipitationSum: Number((forecastJson.daily.precipitation_sum[idx] ?? 0).toFixed(1)),
        precipitationProbabilityMax: Math.round(forecastJson.daily.precipitation_probability_max[idx] ?? 0),
        sunrise: formatLocalTime(forecastJson.daily.sunrise[idx]),
        sunset: formatLocalTime(forecastJson.daily.sunset[idx]),
        windSpeedMax: Math.round(forecastJson.daily.wind_speed_10m_max[idx] ?? 0),
        windDirectionDominant: Math.round(forecastJson.daily.wind_direction_10m_dominant[idx] ?? 0),
      };
    });

    // Parse air quality if available
    let airQuality: AirQualityData | undefined;
    if (airQualityJson && airQualityJson.current) {
      const usAqi = Math.round(airQualityJson.current.us_aqi || 25);
      const cat = parseAqiCategory(usAqi);
      airQuality = {
        usAqi,
        pm2_5: Number((airQualityJson.current.pm2_5 || 0).toFixed(1)),
        pm10: Number((airQualityJson.current.pm10 || 0).toFixed(1)),
        ozone: Number((airQualityJson.current.ozone || 0).toFixed(1)),
        no2: Number((airQualityJson.current.nitrogen_dioxide || 0).toFixed(1)),
        so2: Number((airQualityJson.current.sulphur_dioxide || 0).toFixed(1)),
        co: Number((airQualityJson.current.carbon_monoxide || 0).toFixed(1)),
        category: cat.category,
        color: cat.color,
      };
    }

    return {
      location: locationInfo,
      units,
      current,
      hourly,
      daily,
      airQuality,
      rawJson: {
        forecast: forecastJson,
        airQuality: airQualityJson,
      },
      apiEndpoint: forecastUrl,
      fetchLatencyMs: latency,
      lastUpdated: new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', second: '2-digit' }),
    };
  } catch (err: any) {
    if (err.name === 'AbortError') {
      throw createApiError('ABORT', 'Request Aborted', 'Fetch operation was interrupted.');
    }
    if (err.type) {
      throw err;
    }
    throw createApiError(
      'NETWORK',
      'API Request Failed',
      err.message || 'Unable to retrieve meteorological data from the REST server.'
    );
  }
}

/**
 * Reverse geocodes coordinates (e.g., from HTML5 navigator.geolocation)
 */
export async function reverseGeocodeCoordinates(
  lat: number,
  lon: number,
  signal?: AbortSignal
): Promise<GeoLocationResult> {
  const endpoint = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=10&addressdetails=1`;
  try {
    const res = await fetch(endpoint, {
      headers: { Accept: 'application/json' },
      signal,
    });
    if (res.ok) {
      const data = await res.json();
      const city =
        data.address?.city ||
        data.address?.town ||
        data.address?.village ||
        data.address?.municipality ||
        data.address?.county ||
        'Current Location';
      const country = data.address?.country || '';
      const state = data.address?.state || '';

      return {
        id: Math.round(lat * 1000 + lon),
        name: city,
        latitude: lat,
        longitude: lon,
        admin1: state,
        country,
        country_code: data.address?.country_code?.toUpperCase(),
      };
    }
  } catch {
    // fallback
  }

  return {
    id: Math.round(lat * 1000 + lon),
    name: 'Current Location',
    latitude: lat,
    longitude: lon,
  };
}

function createApiError(
  type: WeatherApiError['type'],
  title: string,
  message: string,
  statusCode?: number
): WeatherApiError {
  return { type, title, message, statusCode };
}

function formatLocalTime(isoString: string): string {
  if (!isoString) return '--:--';
  try {
    const d = new Date(isoString);
    return d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
  } catch {
    return isoString.slice(11, 16);
  }
}
