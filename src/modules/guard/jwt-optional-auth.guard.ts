import type { ExecutionContext } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtOptionalAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  canActivate(context: ExecutionContext) {
    return new Promise(async (resolve) => {
      try {
        await super.canActivate(context);
      } catch {}
      resolve(true);
    }) as Promise<boolean>;
  }
}
