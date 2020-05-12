import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../users/user.entity';
import { Round } from '../rounds/round.entity';

@Entity('game')
export class Game {
  @PrimaryGeneratedColumn()
  @ApiProperty({ readOnly: true })
  id: number;

  @Column({ length: 512 })
  @ApiProperty()
  title: string;

  @ManyToMany(type => User)
  @JoinTable()
  @ApiProperty()
  users: User[];

  @OneToMany(
    type => Round,
    round => round.game,
  )
  @ApiProperty()
  rounds: Round[];
}
