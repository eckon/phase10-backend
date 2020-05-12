import { ApiProperty } from '@nestjs/swagger';
import { Game } from '../games/game.entity';
import { UserSnapshot } from './UserSnapshot';

export class GameSnapshot {
  @ApiProperty({ type: () => Game })
  game: Game;

  @ApiProperty()
  userSnapshots: UserSnapshot[];
}
