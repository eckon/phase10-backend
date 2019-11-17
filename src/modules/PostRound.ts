import { ApiModelProperty } from '@nestjs/swagger';
import { PostUserData } from './PostUserData';

export class PostRound {
  @ApiModelProperty()
  gameId: number;

  @ApiModelProperty()
  winnerId: number;

  @ApiModelProperty({ required: false })
  doubled: boolean;

  @ApiModelProperty()
  users: PostUserData[];
}
