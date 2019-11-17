import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
    return await this.gamesRepository.findOne({
      where: [ { id } ],
      relations: ['users'],
    });
  }

  async insert(game: Game): Promise<Game> {
    return await this.gamesRepository.save(game);
  }

  async delete(id: number): Promise<Game> {
    const game = await this.findById(id);

    if (game === undefined) {
      throw new BadRequestException(`Game ID ${id} could not be found.`);
    }

    return await this.gamesRepository.remove(game);
  }
}
