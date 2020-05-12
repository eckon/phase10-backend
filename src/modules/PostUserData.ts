import { ApiProperty } from '@nestjs/swagger';

export class PostUserData {
  @ApiProperty()
  id: number;

  @ApiProperty()
  points: number;

  @ApiProperty()
  completedPhase: boolean;
}
