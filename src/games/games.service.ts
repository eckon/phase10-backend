import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult } from 'typeorm';
import { Game } from './game.entity';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private readonly gamesRepository: Repository<Game>,
  ) {}

  async findAll(): Promise<Game[]> {
    return await this.gamesRepository.find({ relations: ['users'] });
  }

  async findById(id: number): Promise<Game> {
    return (await this.gamesRepository.find({
      where: [ { id } ],
      relations: ['users'],
    }))[0];
  }

  async insert(game: Game): Promise<Game> {
    return await this.gamesRepository.save(game);
  }
}
