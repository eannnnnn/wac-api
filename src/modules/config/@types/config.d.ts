interface Config {
  PORT: number;
  NODE_ENV: 'production' | 'development' | 'local';
  CORS_ORIGIN: string;
}

type ConfigKey = keyof Config;
