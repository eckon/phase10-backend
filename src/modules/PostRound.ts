import { ApiProperty } from '@nestjs/swagger';
import { PostUserData } from './PostUserData';

export class PostRound {
  @ApiProperty()
  gameId: number;

  @ApiProperty()
  winnerId: number;

  @ApiProperty({ required: false })
  doubled: boolean;

  @ApiProperty()
  users: PostUserData[];
}
