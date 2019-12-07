import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { Game } from '../games/game.entity';
import { User } from '../users/user.entity';
import { RoundInformation } from '../round-informations/roundInformation.entity';

@Entity('round')
export class Round {
  @PrimaryGeneratedColumn()
  @ApiModelProperty({ readOnly: true })
  id: number;

  @ManyToOne(
    type => Game,
    game => game.id,
  )
  @ApiModelProperty()
  game: Game;

  @ManyToOne(
    type => User,
    user => user.id,
  )
  @ApiModelProperty()
  winner: User;

  @OneToMany(
    type => RoundInformation,
    info => info.round,
  )
  @ApiModelProperty()
  roundInformations: RoundInformation[];

  @Column({ default: false })
  @ApiModelProperty()
  doubled: boolean;
}
