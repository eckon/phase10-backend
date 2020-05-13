import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';

export class UserSnapshot {
  constructor(user: User) {
    this.user = user;
    this.phase = 1;
    this.points = 0;
  }

  @ApiProperty()
  phase: number;

  @ApiProperty()
  points: number;

  @ApiProperty()
  user: User;
}
