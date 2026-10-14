export type UnitsMode = 'metric' | 'imperial';

export interface GeoLocationResult {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  elevation?: number;
  country_code?: string;
  country?: string;
  admin1?: string;
  timezone?: string;
}

export interface CurrentWeather {
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: number;
  windGusts: number;
  pressure: number;
  uvIndex: number;
  weatherCode: number;
  isDay: boolean;
  precipitation: number;
  cloudCover: number;
}

export interface HourlyForecastItem {
  time: string;
  isoTime: string;
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  precipitationProbability: number;
  weatherCode: number;
  windSpeed: number;
  uvIndex: number;
}

export interface DailyForecastItem {
  date: string;
  isoDate: string;
  dayName: string;
  weatherCode: number;
  maxTemp: number;
  minTemp: number;
  precipitationSum: number;
  precipitationProbabilityMax: number;
  sunrise: string;
  sunset: string;
  windSpeedMax: number;
  windDirectionDominant: number;
}

export interface AirQualityData {
  usAqi: number;
  pm2_5: number;
  pm10: number;
  ozone: number;
  no2: number;
  so2: number;
  co: number;
  category: 'Good' | 'Moderate' | 'Unhealthy for Sensitive Groups' | 'Unhealthy' | 'Very Unhealthy' | 'Hazardous';
  color: string;
}

export interface WeatherData {
  location: GeoLocationResult;
  units: UnitsMode;
  current: CurrentWeather;
  hourly: HourlyForecastItem[];
  daily: DailyForecastItem[];
  airQuality?: AirQualityData;
  rawJson: Record<string, unknown>;
  apiEndpoint: string;
  fetchLatencyMs: number;
  lastUpdated: string;
}

export interface WeatherApiError {
  type: 'NETWORK' | 'NOT_FOUND' | 'PARSING' | 'GEOLOCATION' | 'ABORT' | 'UNKNOWN';
  title: string;
  message: string;
  statusCode?: number;
}
