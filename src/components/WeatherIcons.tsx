import React from 'react';
import {
  Sun,
  Moon,
  CloudSun,
  CloudMoon,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Snowflake,
} from 'lucide-react';

interface WeatherIconProps {
  name: string;
  className?: string;
  size?: number;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ name, className = 'w-6 h-6', size }) => {
  const props = { className, size };

  switch (name) {
    case 'sun':
      return <Sun {...props} className={`text-amber-400 ${className}`} />;
    case 'moon':
      return <Moon {...props} className={`text-indigo-300 ${className}`} />;
    case 'cloud-sun':
      return <CloudSun {...props} className={`text-amber-300 ${className}`} />;
    case 'cloud-moon':
      return <CloudMoon {...props} className={`text-indigo-200 ${className}`} />;
    case 'cloud':
      return <Cloud {...props} className={`text-slate-300 ${className}`} />;
    case 'cloud-fog':
      return <CloudFog {...props} className={`text-teal-300 ${className}`} />;
    case 'cloud-drizzle':
      return <CloudDrizzle {...props} className={`text-cyan-400 ${className}`} />;
    case 'cloud-rain':
      return <CloudRain {...props} className={`text-sky-400 ${className}`} />;
    case 'cloud-snow':
      return <CloudSnow {...props} className={`text-cyan-200 ${className}`} />;
    case 'snowflake':
      return <Snowflake {...props} className={`text-sky-200 ${className}`} />;
    case 'cloud-lightning':
      return <CloudLightning {...props} className={`text-amber-400 ${className}`} />;
    default:
      return <Cloud {...props} className={`text-slate-300 ${className}`} />;
  }
};
