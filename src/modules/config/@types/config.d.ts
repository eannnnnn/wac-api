interface Config {
  PORT: number;
  NODE_ENV: 'production' | 'development' | 'local';
  CORS_ORIGIN: string;
  JWT_SECRET: string;
}

type ConfigKey = keyof Config;
