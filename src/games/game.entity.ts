import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
import { Round } from 'src/rounds/round.entity';

@Entity('game')
export class Game {
  @PrimaryGeneratedColumn()
  @ApiProperty({ readOnly: true })
  id: number;

  @Column({ length: 512 })
  @ApiProperty()
  title: string;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @ManyToMany(type => User)
  @JoinTable()
  @ApiProperty()
  users: User[];

  @OneToMany(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type => Round,
    round => round.game,
  )
  @ApiProperty()
  rounds: Round[];
}
