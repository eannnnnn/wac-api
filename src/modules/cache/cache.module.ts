import { CacheModule as NestCacheModule, CacheModuleOptions, Global, Module } from '@nestjs/common';
import * as redistStore from 'cache-manager-ioredis';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
import { CacheService } from './cache.service';

@Global()
@Module({
  imports: [
    NestCacheModule.register({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) =>
        ({
          store: redistStore,
          host: config.get('REDIS_HOST'),
          port: config.get('REDIS_PORT'),
          username: config.get('REDIS_USERNAME'),
          password: config.get('REDIS_PASSWORD'),
        } as CacheModuleOptions),
    }),
  ],
  providers: [CacheService],
  exports: [CacheService],
})
export class CacheModule {}
