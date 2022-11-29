import compression from '@fastify/compress';
import fastifyHelmet, { FastifyHelmetOptions } from '@fastify/helmet';
import type { NestFastifyApplication } from '@nestjs/platform-fastify';
import { ConfigService } from '~/modules/config/config.service';

export const loadMiddleware = async (app: NestFastifyApplication) => {
  const configService = app.get(ConfigService);
  const corsOrigin = configService.get('CORS_ORIGIN');
  const helmetOptions: FastifyHelmetOptions = {};

  // Fastif Helemt Swagger Support
  if (configService.get('NODE_ENV') !== 'production') {
    helmetOptions.contentSecurityPolicy = {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
        imgSrc: ["'self'", 'data:', 'validator.swagger.io'],
      },
    };
  }

  await app.register(fastifyHelmet, helmetOptions);
  await app.register(compression, { encodings: ['gzip', 'deflate'] });
  app.enableCors({
    origin: corsOrigin.split(' '),
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    maxAge: 600, // 10 minutes
  });
};
