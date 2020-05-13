import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>
  ) {}

  async findAll(): Promise<Account[]> {
    return await this.accountRepository.find();
  }

  async findByName(name: string): Promise<Account> {
    return await this.accountRepository.findOne({ name });
  }

  async register(user: Account): Promise<Account> {
    const { name } = user;
    const existingAccount = await this.accountRepository.findOne({ where: { name } });
    if (existingAccount) {
      throw new BadRequestException(`Account name ${name} already exists.`);
    }

    const newUser = await this.accountRepository.create(user);
    return await this.accountRepository.save(newUser);
  }
}
