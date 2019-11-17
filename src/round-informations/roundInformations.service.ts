import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoundInformation } from './roundInformation.entity';

@Injectable()
export class RoundInformationsService {
  constructor(
    @InjectRepository(RoundInformation)
    private readonly userRepository: Repository<RoundInformation>,
  ) {}

  async findAll(): Promise<RoundInformation[]> {
    return await this.userRepository.find({ relations: ['round', 'user'] });
  }

  async findById(id: number): Promise<RoundInformation> {
    return await this.userRepository.findOne({
      relations: ['round', 'round.game', 'user'],
      where: [{ id }],
    });
  }

  async insert(info: RoundInformation): Promise<RoundInformation> {
    return await this.userRepository.save(info);
  }

  async insertArray(infos: RoundInformation[]): Promise<RoundInformation[]> {
    return await this.userRepository.save(infos);
  }
}
