import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Game } from '../games/game.entity';
import { User } from '../users/user.entity';
import { RoundInformation } from '../round-informations/roundInformation.entity';

@Entity('round')
export class Round {
  @PrimaryGeneratedColumn()
  @ApiProperty({ readOnly: true })
  id: number;

  @ManyToOne(
    type => Game,
    game => game.id,
  )
  @ApiProperty({ type: () => Game })
  game: Game;

  @ManyToOne(
    type => User,
    user => user.id,
  )
  @ApiProperty()
  winner: User;

  @OneToMany(
    type => RoundInformation,
    info => info.round,
  )
  @ApiProperty()
  roundInformations: RoundInformation[];

  @Column({ default: false })
  @ApiProperty()
  doubled: boolean;
}
