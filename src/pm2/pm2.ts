/**
 *  Pm2 무중단 배포를 위한 관련 함수 모음
 */

import type { NestFastifyApplication } from '@nestjs/platform-fastify';
import { pm2ConnectionMiddleware } from './pm2-connection-middleware';

export let isDisableKeepAlive = false;

export const sendPm2ReadSignal = () => {
  // PM2 send ready signal
  process.send?.('ready');
};

export const onClosePm2Event = (app: NestFastifyApplication) => {
  app.use(pm2ConnectionMiddleware);
  process.on('SIGINT', async () => {
    isDisableKeepAlive = true;
    await app.close();
    process.exit(0);
  });
};
