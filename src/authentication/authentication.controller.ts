import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthenticationGuard } from './local-authentication.guard';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('authentication')
@Controller('authentication')
export class AuthenticationController {
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  @ApiResponse({ status: 200 })
  async login(@Request() req) {
    return req.user;
  }
}
