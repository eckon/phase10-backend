import { Injectable } from '@nestjs/common';
import { AccountsService } from 'src/accounts/accounts.service';
import { JwtService } from '@nestjs/jwt'
import { Account } from 'src/accounts/account.entity';

@Injectable()
export class AuthService {
  constructor(
    private accountService: AccountsService,
    private jwtService: JwtService
  ) {}

  async register(account: Account) {
    return await this.accountService.register(account);
  }

  async validateAccount(username: string, password: string): Promise<any> {
    const account = await this.accountService.findByName(username);
    if (account && await account.comparePassword(password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = account;
      return result;
    }
    return null;
  }

  async login(account: Account) {
    const payload = { username: account.name, sub: account.id };
    return {
      // eslint-disable-next-line @typescript-eslint/camelcase
      access_token: this.jwtService.sign(payload),
    };
  }
}
