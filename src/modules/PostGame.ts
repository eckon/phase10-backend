import { ApiProperty } from '@nestjs/swagger';

export class PostGame {
  @ApiProperty()
  title: string;

  @ApiProperty()
  userIds: number[];
}
