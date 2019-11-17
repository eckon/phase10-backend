import { ApiModelProperty } from '@nestjs/swagger';

export class PostUserData {
  @ApiModelProperty()
  id: number;

  @ApiModelProperty()
  points: number;

  @ApiModelProperty()
  completedPhase: boolean;
}
