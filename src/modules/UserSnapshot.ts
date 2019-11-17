import { ApiModelProperty } from '@nestjs/swagger';
import { User } from '../users/user.entity';

export class UserSnapshot {
  @ApiModelProperty()
  phase: number;

  @ApiModelProperty()
  points: number;

  @ApiModelProperty()
  user: User;
}
