import { Global, Module } from '@nestjs/common';
import { createClient } from 'redis';
import { ConfigService } from '../config/config.service';
import { RedisService } from './redis.service';

@Global()
@Module({
  providers: [
    {
      provide: 'REDIS_CLIENT',
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        const redisClient = createClient({
          url: config.get('REDIS_URL'),
        });
        await redisClient.connect();
        return redisClient;
      },
    },
    RedisService,
  ],
  exports: [RedisService],
})
export class RedisModule {}
