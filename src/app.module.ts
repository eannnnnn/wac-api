import { Module } from '@nestjs/common';
import { ConfigModule } from './modules/config/config.module';
import { HealthModule } from './modules/health/health.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [ConfigModule, PrismaModule, HealthModule, UserModule],
})
export class AppModule {}
