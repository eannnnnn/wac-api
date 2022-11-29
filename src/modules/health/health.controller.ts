import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CacheService } from '../cache/cache.service';
import { JwtAuth } from '../decorator/auth.decorator';

@ApiTags('Health')
@Controller('/health')
export class HealthController {
  constructor(private readonly cacheService: CacheService) {}
  @Get()
  async healthCheck() {
    const hi = await this.cacheService.getKey('hi');

    if (!hi) {
      await this.cacheService.setKey('hi', 'hello');
    }

    console.log(await this.cacheService.getKey('hi'));

    return 'OK';
  }

  @JwtAuth
  @Get('/jwt/ping')
  jwtPing() {
    return 'OK';
  }
}
