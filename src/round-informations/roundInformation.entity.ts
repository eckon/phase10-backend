import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { Round } from '../rounds/round.entity';
import { User } from '../users/user.entity';

@Entity('roundinformation')
export class RoundInformation {
  @PrimaryGeneratedColumn()
  @ApiModelProperty({ readOnly: true })
  id: number;

  @ManyToOne(
    type => Round,
    round => round.id,
  )
  @ApiModelProperty()
  round: Round;

  @ManyToOne(
    type => User,
    user => user.id,
  )
  @ApiModelProperty()
  user: User;

  @Column({ default: false })
  @ApiModelProperty()
  completedPhase: boolean;

  @Column({ default: 0 })
  @ApiModelProperty()
  points: number;
}
