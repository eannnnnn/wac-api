import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { JwtOptionalAuthGuard } from '../guard/jwt-optional-auth.guard';

export const JwtAuth = applyDecorators(UseGuards(JwtAuthGuard), ApiBearerAuth());

export const JwtOptionalAuth = applyDecorators(UseGuards(JwtOptionalAuthGuard), ApiBearerAuth());
