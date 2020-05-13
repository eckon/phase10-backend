import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getConnection } from 'typeorm';
import { Round } from './round.entity';
import { PostRoundResult } from '../modules/PostRoundResult';
import { PostRound } from '../modules/PostRound';
import { RoundInformationsService } from '../round-informations/roundInformations.service';
import { GamesService } from 'src/games/games.service';
import { UsersService } from 'src/users/users.service';
import { RoundInformation } from 'src/round-informations/roundInformation.entity';

@Injectable()
export class RoundsService {
  constructor(
    @InjectRepository(Round)
    private readonly roundsRepository: Repository<Round>,
    private readonly roundsInformationsService: RoundInformationsService,
    private readonly gamesService: GamesService,
    private readonly usersService: UsersService,
  ) {}

  async findAll(): Promise<Round[]> {
    return await this.roundsRepository.find({ relations: ['winner'] });
  }

  async findById(id: number): Promise<Round> {
    return await this.roundsRepository.findOne({
      relations: [
        'game',
        'game.users',
        'winner',
        'roundInformations',
        'roundInformations.user',
      ],
      where: [{ id }],
    });
  }

  async insert(round: Round): Promise<Round> {
    return await this.roundsRepository.save(round);
  }

  async insertPostRound(post: PostRound): Promise<PostRoundResult> {
    const connection = getConnection();
    const queryRunner = connection.createQueryRunner();
    queryRunner.connect();
    queryRunner.startTransaction();
    try {
      const winner = await this.usersService.findById(post.winnerId);
      const game = await this.gamesService.findById(post.gameId);

      if (winner === undefined) {
        throw new BadRequestException(
          `Winner with ID ${post.winnerId} was not found.`,
        );
      }

      if (game === undefined) {
        throw new BadRequestException(
          `Game with ID ${post.gameId} was not found.`,
        );
      }

      const newRound = new Round();
      newRound.winner = winner;
      newRound.game = game;
      newRound.doubled = post.doubled;
      const round = await this.insert(newRound);

      // create array with possible ids to check when inserting the user in the round
      const gameUserIds = [];
      for (const user of game.users) {
        gameUserIds.push(user.id);
      }

      const information = [];
      for (const userdata of post.users) {
        const user = await this.usersService.findById(userdata.id);

        // only users that are in the game can be in a round
        if (!gameUserIds.includes(user.id)) {
          throw new BadRequestException(
            `User ${user.name} (${user.id}) is not participating in the Game ${game.id}.`,
          );
        }

        const info = new RoundInformation();
        info.user = user;
        info.round = round;
        info.completedPhase = userdata.completedPhase;
        info.points = userdata.points;
        const infoResult = await this.roundsInformationsService.insert(info);
        // delete not needed info -> would clutter the response
        delete infoResult.round;
        information.push(infoResult);
      }

      const result = new PostRoundResult();
      result.round = round;
      result.information = information;

      queryRunner.commitTransaction();
      return result;
    } catch (e) {
      queryRunner.rollbackTransaction();
      throw e;
    }
  }
}
