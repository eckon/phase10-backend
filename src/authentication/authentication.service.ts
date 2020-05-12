import { Injectable } from '@nestjs/common';
import { AccountsService } from 'src/accounts/accounts.service';

@Injectable()
export class AuthenticationService {
    constructor(private accountService: AccountsService) {}

  async validateAccount(username: string, pass: string): Promise<any> {
    const account = await this.accountService.findOne(username);
    if (account && account.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = account;
      return result;
    }
    return null;
  }
}
