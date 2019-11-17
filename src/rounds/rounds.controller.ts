import { Get, Controller, Param, Post, Body, Delete, BadRequestException } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Round } from './round.entity';
import { RoundsService } from './rounds.service';
import { PostRound } from '../modules/PostRound';
import { GamesService } from '../games/games.service';
import { UsersService } from '../users/users.service';

@Controller('rounds')
export class RoundsController {
    constructor(
      private readonly roundsService: RoundsService,
      private readonly gamesService: GamesService,
      private readonly usersService: UsersService,
    ) {}

    @Get()
    @ApiResponse({ status: 200, type: Round, isArray: true })
    async get(): Promise<Round[]> {
      return await this.roundsService.findAll();
    }

    @Get(':id')
    @ApiResponse({ status: 200, type: Round })
    async getById(@Param() params: any): Promise<Round> {
      const id = Number(params.id);
      return await this.roundsService.findById(id);
    }

    @Post()
    @ApiResponse({ status: 201, type: Round })
    async insert(@Body() post: PostRound): Promise<Round> {
      const winner = await this.usersService.findById(post.winnerId);
      const game = await this.gamesService.findById(post.gameId);

      if (winner === undefined) {
        throw new BadRequestException(`Winner with ID ${post.winnerId} was not found.`);
      }

      if (game === undefined) {
        throw new BadRequestException(`Game with ID ${post.gameId} was not found.`);
      }

      const round = new Round();
      round.winner = winner;
      round.game = game;
      round.doubled = post.doubled;

      return await this.roundsService.insert(round);
    }
}
