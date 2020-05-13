import { Injectable } from '@nestjs/common';
import { AccountsService } from '../accounts/accounts.service';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
    constructor(
      private accountService: AccountsService,
      private jwtService: JwtService
    ) {}

  async validateAccount(username: string, pass: string): Promise<any> {
    const account = await this.accountService.findOne(username);
    if (account && account.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = account;
      return result;
    }
    return null;
  }
  
  async login(account: any) {
    const payload = { username: account.username, sub: account.userId };
    return {
      // eslint-disable-next-line @typescript-eslint/camelcase
      access_token: this.jwtService.sign(payload),
    };
  }
}
