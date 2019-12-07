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

  async findRunning(): Promise<Game[]> {
    const allGames = await this.gamesRepository.find({
      relations: [
        'users',
        'rounds',
        'rounds.roundInformations',
        'rounds.roundInformations.user',
      ],
    });

    const runningGames = allGames.filter(ele => {
      let userPhase = [];
      if (ele.rounds === undefined || ele.rounds.length === 0) {
        return true;
      }
      for (const round of ele.rounds) {
        for (const info of round.roundInformations) {
          if (!info.completedPhase) {
            continue;
          }

          if (userPhase[info.user.id] === undefined) {
            userPhase[info.user.id] = 1;
          }
          userPhase[info.user.id]++;

          if (userPhase[info.user.id] > 10) {
            return false;
          }
        }
      }
      return true;
    });

    return runningGames;
  }

  async findById(id: number): Promise<Game> {
    return await this.gamesRepository.findOne({
      where: [{ id }],
      relations: ['users'],
    });
  }

  async findDetailedById(id: number): Promise<Game> {
    return await this.gamesRepository.findOne({
      where: [{ id }],
      relations: [
        'users',
        'rounds',
        'rounds.winner',
        'rounds.roundInformations',
        'rounds.roundInformations.user',
      ],
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
