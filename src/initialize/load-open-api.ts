import { INestApplication } from '@nestjs/common';
import { ConfigService } from '~/modules/config/config.service';

export const loadOpenApi = async (app: INestApplication) => {
  const config = app.get(ConfigService);
  if (config.get('NODE_ENV') !== 'production') {
    const { DocumentBuilder, SwaggerModule } = await import('@nestjs/swagger');
    const options = new DocumentBuilder()
      .setTitle('WACA - WEB API')
      .setDescription('API Documentation')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('api', app, document);
  }
};
