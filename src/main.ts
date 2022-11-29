import { NestFactory } from '@nestjs/core';
import type { NestFastifyApplication } from '@nestjs/platform-fastify';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { initializeApp } from './initialize/initiallize-app';
import { ConfigService } from './modules/config/config.service';
import { onClosePm2Event, sendPm2ReadSignal } from './pm2/pm2';

async function runApp() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter());
  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  await initializeApp(app);
  await app.listen(port, '0.0.0.0');

  // PM2
  if (configService.get('NODE_ENV') === 'production') {
    onClosePm2Event(app);
    sendPm2ReadSignal();
  }
}

runApp();
