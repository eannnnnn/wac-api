interface Config {
  PORT: number;
  NODE_ENV: 'production' | 'development' | 'local';
  CORS_ORIGIN: string;
  JWT_SECRET: string;
  REDIS_HOST: string;
  REDIS_PORT: string;
  REDIS_USERNAME: string;
  REDIS_PASSWORD: string;
}

type ConfigKey = keyof Config;
