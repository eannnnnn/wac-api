import type { NestFastifyApplication } from '@nestjs/platform-fastify';
import { loadMiddleware } from './load-middleware';
import { loadOpenApi } from './load-open-api';

export const initializeApp = async (app: NestFastifyApplication) => {
  await loadOpenApi(app);
  await loadMiddleware(app);
};
