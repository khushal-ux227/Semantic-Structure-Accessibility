export interface WeatherInterpretation {
  code: number;
  label: string;
  description: string;
  iconName: 'sun' | 'moon' | 'cloud-sun' | 'cloud-moon' | 'cloud' | 'cloud-fog' | 'cloud-drizzle' | 'cloud-rain' | 'cloud-snow' | 'cloud-lightning' | 'snowflake';
  gradient: string;
  bgGlow: string;
}

export function getWeatherInterpretation(code: number, isDay = true): WeatherInterpretation {
  switch (code) {
    case 0:
      return {
        code,
        label: isDay ? 'Clear Sky' : 'Clear Night',
        description: 'Pristine unobstructed atmospheric conditions',
        iconName: isDay ? 'sun' : 'moon',
        gradient: isDay ? 'from-amber-500/20 via-sky-600/10 to-transparent' : 'from-indigo-900/30 via-slate-900/10 to-transparent',
        bgGlow: isDay ? 'rgba(245, 158, 11, 0.15)' : 'rgba(99, 102, 241, 0.15)'
      };
    case 1:
      return {
        code,
        label: isDay ? 'Mainly Sunny' : 'Mainly Clear',
        description: 'Scattered high-altitude cirrus clouds',
        iconName: isDay ? 'sun' : 'moon',
        gradient: isDay ? 'from-amber-500/20 via-sky-500/10 to-transparent' : 'from-indigo-900/30 via-slate-900/10 to-transparent',
        bgGlow: isDay ? 'rgba(251, 191, 36, 0.15)' : 'rgba(99, 102, 241, 0.12)'
      };
    case 2:
      return {
        code,
        label: isDay ? 'Partly Cloudy' : 'Partly Cloudy Night',
        description: 'Cumulus clouds intermixed with open skies',
        iconName: isDay ? 'cloud-sun' : 'cloud-moon',
        gradient: 'from-sky-600/20 via-slate-800/10 to-transparent',
        bgGlow: 'rgba(56, 189, 248, 0.12)'
      };
    case 3:
      return {
        code,
        label: 'Overcast',
        description: 'Dense stratus cloud ceiling',
        iconName: 'cloud',
        gradient: 'from-slate-700/20 via-slate-800/10 to-transparent',
        bgGlow: 'rgba(148, 163, 184, 0.12)'
      };
    case 45:
    case 48:
      return {
        code,
        label: code === 45 ? 'Dense Fog' : 'Depositing Rime Fog',
        description: 'Horizontal visibility severely constrained',
        iconName: 'cloud-fog',
        gradient: 'from-teal-800/20 via-slate-800/10 to-transparent',
        bgGlow: 'rgba(45, 212, 191, 0.12)'
      };
    case 51:
    case 53:
    case 55:
      return {
        code,
        label: code === 51 ? 'Light Drizzle' : code === 53 ? 'Moderate Drizzle' : 'Dense Drizzle',
        description: 'Fine mist-like liquid droplets',
        iconName: 'cloud-drizzle',
        gradient: 'from-cyan-700/20 via-slate-900/10 to-transparent',
        bgGlow: 'rgba(6, 182, 212, 0.15)'
      };
    case 61:
    case 63:
    case 65:
      return {
        code,
        label: code === 61 ? 'Slight Rain' : code === 63 ? 'Moderate Rain' : 'Heavy Rainfall',
        description: 'Continuous steady liquid precipitation',
        iconName: 'cloud-rain',
        gradient: 'from-blue-700/25 via-slate-900/10 to-transparent',
        bgGlow: 'rgba(59, 130, 246, 0.18)'
      };
    case 71:
    case 73:
    case 75:
      return {
        code,
        label: code === 71 ? 'Slight Snowfall' : code === 73 ? 'Moderate Snow' : 'Heavy Snowfall',
        description: 'Atmospheric crystalline water accumulation',
        iconName: 'snowflake',
        gradient: 'from-indigo-600/20 via-sky-900/10 to-transparent',
        bgGlow: 'rgba(165, 243, 252, 0.2)'
      };
    case 77:
      return {
        code,
        label: 'Snow Grains',
        description: 'Small opaque ice grains falling from stratiform clouds',
        iconName: 'snowflake',
        gradient: 'from-sky-700/20 via-slate-900/10 to-transparent',
        bgGlow: 'rgba(186, 230, 253, 0.18)'
      };
    case 80:
    case 81:
    case 82:
      return {
        code,
        label: code === 80 ? 'Slight Rain Showers' : code === 81 ? 'Moderate Rain Showers' : 'Violent Rain Showers',
        description: 'Sudden convective precipitation bursts',
        iconName: 'cloud-rain',
        gradient: 'from-blue-600/30 via-slate-900/10 to-transparent',
        bgGlow: 'rgba(37, 99, 235, 0.2)'
      };
    case 85:
    case 86:
      return {
        code,
        label: code === 85 ? 'Slight Snow Showers' : 'Heavy Snow Showers',
        description: 'Intermittent heavy snow bursts',
        iconName: 'cloud-snow',
        gradient: 'from-cyan-800/25 via-slate-900/10 to-transparent',
        bgGlow: 'rgba(125, 211, 252, 0.2)'
      };
    case 95:
      return {
        code,
        label: 'Thunderstorm',
        description: 'Atmospheric instability with lightning discharge',
        iconName: 'cloud-lightning',
        gradient: 'from-amber-600/25 via-purple-900/20 to-transparent',
        bgGlow: 'rgba(217, 119, 6, 0.2)'
      };
    case 96:
    case 99:
      return {
        code,
        label: 'Thunderstorm with Hail',
        description: 'Severe convective storm with violent ice pellets',
        iconName: 'cloud-lightning',
        gradient: 'from-rose-700/25 via-purple-950/20 to-transparent',
        bgGlow: 'rgba(225, 29, 72, 0.25)'
      };
    default:
      return {
        code,
        label: 'Variable Conditions',
        description: 'Mixed atmospheric precipitation patterns',
        iconName: isDay ? 'cloud-sun' : 'cloud-moon',
        gradient: 'from-slate-700/20 via-slate-900/10 to-transparent',
        bgGlow: 'rgba(100, 116, 139, 0.15)'
      };
  }
}

export function degreesToCompass(deg: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round((deg % 360) / 22.5) % 16;
  return directions[index];
}

export function getUvCategory(uv: number): { label: string; risk: string; color: string } {
  if (uv < 3) return { label: 'Low', risk: 'Minimal protection required', color: 'text-emerald-400' };
  if (uv < 6) return { label: 'Moderate', risk: 'Sunscreen and sunglasses advised', color: 'text-yellow-400' };
  if (uv < 8) return { label: 'High', risk: 'Hat, sunscreen SPF 30+ recommended', color: 'text-orange-400' };
  if (uv < 11) return { label: 'Very High', risk: 'Seek shade during peak midday hours', color: 'text-rose-400' };
  return { label: 'Extreme', risk: 'Avoid direct midday sun exposure', color: 'text-purple-400' };
}

export function parseAqiCategory(usAqi: number): {
  category: 'Good' | 'Moderate' | 'Unhealthy for Sensitive Groups' | 'Unhealthy' | 'Very Unhealthy' | 'Hazardous';
  color: string;
} {
  if (usAqi <= 50) return { category: 'Good', color: 'text-emerald-400' };
  if (usAqi <= 100) return { category: 'Moderate', color: 'text-yellow-400' };
  if (usAqi <= 150) return { category: 'Unhealthy for Sensitive Groups', color: 'text-orange-400' };
  if (usAqi <= 200) return { category: 'Unhealthy', color: 'text-rose-400' };
  if (usAqi <= 300) return { category: 'Very Unhealthy', color: 'text-purple-400' };
  return { category: 'Hazardous', color: 'text-amber-500' };
}
