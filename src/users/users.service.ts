import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async insert(user: User): Promise<User> {
    delete user.id;
    const result = await this.userRepository.insert(user);
    return this.findById(result.identifiers[0].id);
  }

  async deleteById(id: number): Promise<User> {
    const user = await this.findById(id);

    if (user === undefined) {
      throw new BadRequestException(`User ID ${id} could not be found.`);
    }

    return await this.userRepository.remove(user);
  }
}
