import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Game } from 'src/games/game.entity';
import { User } from 'src/users/user.entity';
import { RoundInformation } from 'src/round-informations/roundInformation.entity';

@Entity('round')
export class Round {
  @PrimaryGeneratedColumn()
  @ApiProperty({ readOnly: true })
  id: number;

  @ManyToOne(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type => Game,
    game => game.id,
  )
  @ApiProperty({ type: () => Game })
  game: Game;

  @ManyToOne(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type => User,
    user => user.id,
  )
  @ApiProperty()
  winner: User;

  @OneToMany(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type => RoundInformation,
    info => info.round,
  )
  @ApiProperty()
  roundInformations: RoundInformation[];

  @Column({ default: false })
  @ApiProperty()
  doubled: boolean;
}
