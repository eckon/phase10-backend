import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Round } from './round.entity';

@Injectable()
export class RoundsService {
  constructor(
    @InjectRepository(Round)
    private readonly roundsRepository: Repository<Round>,
  ) {}

  async findAll(): Promise<Round[]> {
    return await this.roundsRepository.find({ relations: ['winner'] });
  }

  async findById(id: number): Promise<Round> {
    return await this.roundsRepository.findOne({
      relations: ['game', 'game.users', 'winner'],
      where: [ { id } ],
    });
  }

  async insert(round: Round): Promise<Round> {
    return await this.roundsRepository.save(round);
  }
}
