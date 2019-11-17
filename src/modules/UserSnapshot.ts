import { ApiModelProperty } from '@nestjs/swagger';
import { User } from '../users/user.entity';

export class UserSnapshot {

  constructor(user: User) {
    this.user = user;
    this.phase = 1;
    this.points = 0;
  }

  @ApiModelProperty()
  phase: number;

  @ApiModelProperty()
  points: number;

  @ApiModelProperty()
  user: User;
}
