import { Get, Controller, Param, Post, Body, Delete } from '@nestjs/common';
import { GamesService } from './games.service';
import { Game } from './game.entity';
import { ApiResponse } from '@nestjs/swagger';
import { PostGame } from '../modules/PostGame';
import { UsersService } from '../users/users.service';

@Controller('games')
export class GamesController {
    constructor(
      private readonly gamesService: GamesService,
      private readonly usersService: UsersService,
    ) {}

    @Get()
    @ApiResponse({ status: 200, type: Game, isArray: true })
    async getUsers(): Promise<Game[]> {
      return await this.gamesService.findAll();
    }

    @Get(':id')
    @ApiResponse({ status: 200, type: Game })
    async getUserById(@Param() params: any): Promise<Game> {
      const id = Number(params.id);
      return await this.gamesService.findById(id);
    }

    @Post()
    @ApiResponse({ status: 201, type: Game })
    async insertGame(@Body() post: PostGame): Promise<Game> {
      const game = new Game();
      game.title = post.title;
      game.users = [];

      for (const userId of post.userIds) {
        if (!userId) {
          continue;
        }
        const id = Number(userId);
        const user = await this.usersService.findById(id);
        game.users.push(user);
      }

      return await this.gamesService.insert(game);
    }

}
