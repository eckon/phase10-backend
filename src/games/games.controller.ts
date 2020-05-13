import { Get, Controller, Param, Post, Body, Delete } from '@nestjs/common';
import { GamesService } from './games.service';
import { Game } from './game.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostGame } from 'src/modules/PostGame';
import { UsersService } from 'src/users/users.service';
import { GameSnapshot } from 'src/modules/GameSnapshot';
import { UserSnapshot } from 'src/modules/UserSnapshot';

@ApiTags('games')
@Controller('games')
export class GamesController {
  constructor(
    private readonly gamesService: GamesService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  @ApiResponse({ status: 200, type: Game, isArray: true })
  async get(): Promise<Game[]> {
    return await this.gamesService.findAll();
  }

  @Get('running')
  @ApiResponse({ status: 200, type: Game, isArray: true })
  async getRunning(): Promise<Game[]> {
    return await this.gamesService.findRunning();
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: Game })
  async getById(@Param() params: any): Promise<Game> {
    const id = Number(params.id);
    return await this.gamesService.findDetailedById(id);
  }

  @Get(':id/snapshot')
  @ApiResponse({ status: 200, type: GameSnapshot })
  async getSnapshotById(@Param() params: any): Promise<GameSnapshot> {
    const id = Number(params.id);
    const data = await this.gamesService.findDetailedById(id);

    const gameSnapshot = new GameSnapshot();
    // ignore not needed information in the response
    gameSnapshot.game = new Game();
    gameSnapshot.game.id = data.id;
    gameSnapshot.game.title = data.title;

    // initialize all the users
    const userSnapshots = [];
    for (const user of data.users) {
      const userSnapshot = new UserSnapshot(user);
      userSnapshots.push(userSnapshot);
    }

    for (const round of data.rounds) {
      for (const info of round.roundInformations) {
        const userSnapshotIndex = userSnapshots.findIndex(
          userInfo => userInfo.user.id === info.user.id,
        );
        if (info.completedPhase) {
          userSnapshots[userSnapshotIndex].phase++;
        }

        let points = info.points;
        if (round.doubled) {
          points *= 2;
        }
        userSnapshots[userSnapshotIndex].points += points;
      }
    }

    gameSnapshot.userSnapshots = userSnapshots;
    return gameSnapshot;
  }

  @Post()
  @ApiResponse({ status: 201, type: Game })
  async insert(@Body() post: PostGame): Promise<Game> {
    // outsource this into a service
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

  @Delete(':id')
  @ApiResponse({ status: 200, type: Game })
  @ApiResponse({ status: 400, description: 'Did not find the Game with ID .' })
  async delete(@Param() params: any) {
    const id = Number(params.id);
    return await this.gamesService.delete(id);
  }
}
