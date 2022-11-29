import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import type { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private readonly cacheManager: Cache) {}

  async setKey(key: string, value: string): Promise<boolean> {
    await this.cacheManager.set(key, value);
    return true;
  }

  async getKey(key: string): Promise<string> {
    const rtn = (await this.cacheManager.get(key)) as string;
    return rtn;
  }
}
