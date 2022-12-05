import { Inject, Injectable, OnApplicationShutdown } from '@nestjs/common';
import type { RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnApplicationShutdown {
  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType) {}

  onApplicationShutdown() {
    this.redisClient.disconnect();
  }

  async get(key: string) {
    return this.redisClient.get(key);
  }

  async set(key: string, value: string) {
    return this.redisClient.set(key, value);
  }
}
