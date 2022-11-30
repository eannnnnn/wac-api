import { Inject, Injectable, OnApplicationShutdown } from '@nestjs/common';
import type { RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnApplicationShutdown {
  constructor(@Inject('REDIS_CLIENT') private readonly redisClient: RedisClientType) {}

  onApplicationShutdown() {
    this.redisClient.disconnect();
  }

  async getJson(key: string, path = '.') {
    return this.redisClient.json.get(key, {
      path: path,
    });
  }

  async get(key: string) {
    return this.redisClient.get(key);
  }

  async set(key: string, value: string) {
    return this.redisClient.set(key, value);
  }

  async setJson<T>(key: string, value: Record<string, T>, path = '.') {
    return this.redisClient.json.set(key, path, value as any);
  }
}
