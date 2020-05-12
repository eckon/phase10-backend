import { Injectable } from '@nestjs/common';

export type Account = any;

@Injectable()
export class AccountsService {

private readonly accounts: Account[];

  constructor() {
    this.accounts = [
      {
        userId: 1,
        username: 'john',
        password: 'changeme',
      },
      {
        userId: 2,
        username: 'chris',
        password: 'secret',
      },
      {
        userId: 3,
        username: 'maria',
        password: 'guess',
      },
    ];
  }

  async findOne(username: string): Promise<Account | undefined> {
    return this.accounts.find(account => account.username === username);
  }
}
