import { Injectable } from '@nestjs/common';
import { ConfigService as NestConfigService } from '@nestjs/config';

@Injectable()
export class ConfigService {
  constructor(private readonly nestConfigService: NestConfigService) {}

  get<T extends ConfigKey>(key: T) {
    return this.nestConfigService.get(key) as Config[T];
  }
}
