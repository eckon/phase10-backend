import { ApiModelProperty } from '@nestjs/swagger';
import { Game } from '../games/game.entity';
import { UserSnapshot } from './UserSnapshot';

export class GameSnapshot {
  @ApiModelProperty()
  game: Game;

  @ApiModelProperty()
  userSnapshots: UserSnapshot[];
}
