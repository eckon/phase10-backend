import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findById(id: number): Promise<User> {
    return (await this.userRepository.find({ id }))[0];
  }

  async insert(user: User): Promise<InsertResult> {
    delete user.id;
    return await this.userRepository.insert(user);
  }

  async deleteById(id: number): Promise<User> {
    const user = await this.findById(id);

    if (user === undefined) {
      return new User();
    }

    return await this.userRepository.remove(user);
  }
}
