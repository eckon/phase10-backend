import { ApiModelProperty } from '@nestjs/swagger';

export class PostGame {
  @ApiModelProperty()
  title: string;

  @ApiModelProperty()
  userIds: number[];
}
