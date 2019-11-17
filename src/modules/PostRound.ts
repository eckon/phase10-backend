import { ApiModelProperty } from '@nestjs/swagger';

export class PostRound {
  @ApiModelProperty()
  gameId: number;

  @ApiModelProperty()
  winnerId: number;

  @ApiModelProperty({ required: false })
  doubled: boolean;
}
