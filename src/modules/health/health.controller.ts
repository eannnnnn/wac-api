import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '~/guard/jwt-auth.guard';

@Controller('/health')
export class HealthController {
  @Get()
  healthCheck() {
    return 'OK';
  }

  @Get('/jwt/ping')
  @UseGuards(JwtAuthGuard)
  jwtPing() {
    return 'OK';
  }
}
