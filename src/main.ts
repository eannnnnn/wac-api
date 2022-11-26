import compression from '@fastify/compress';
import fastifyHelmet from '@fastify/helmet';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { ConfigService } from './modules/config/config.service';

async function runApp() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  await registerApp(app);
  await corsApp(app);
  const configService = app.get(ConfigService);
  await app.listen(configService.get('PORT'), '0.0.0.0');
  process.send?.('ready');
}
// Cors Setup
async function corsApp(app: NestFastifyApplication) {
  const configService = app.get(ConfigService);
  const corsOrigin = configService.get('CORS_ORIGIN');
  app.enableCors({
    origin: corsOrigin.split(' '),
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    maxAge: 600, // 10 minutes
  });
}
// Register MiddleWarers
async function registerApp(app: NestFastifyApplication) {
  await app.register(fastifyHelmet);
  await app.register(compression, { encodings: ['gzip', 'deflate'] });
}

runApp();
