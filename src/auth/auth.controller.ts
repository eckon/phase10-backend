import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Account } from 'src/accounts/account.entity';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiResponse({ status: 200, type: Account })
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // TODO: remove
  // this is mainly meant as an example on how to use the JwtAuthGuard
  @UseGuards(JwtAuthGuard)
  @Get('profile')
  @ApiResponse({ status: 200 })
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('register')
  @ApiResponse({ status: 200 })
    async register(@Body() account: Account) {
    return await this.authService.register(account);
  }

  // TODO: update and delete accounts --- https://codebrains.io/nest-js-express-jwt-authentication-with-typeorm-and-passport/
}
