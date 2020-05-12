import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Round } from '../rounds/round.entity';
import { User } from '../users/user.entity';

@Entity('roundinformation')
export class RoundInformation {
  @PrimaryGeneratedColumn()
  @ApiProperty({ readOnly: true })
  id: number;

  @ManyToOne(
    type => Round,
    round => round.id,
  )
  @ApiProperty({ type: () => Round })
  round: Round;

  @ManyToOne(
    type => User,
    user => user.id,
  )
  @ApiProperty()
  user: User;

  @Column({ default: false })
  @ApiProperty()
  completedPhase: boolean;

  @Column({ default: 0 })
  @ApiProperty()
  points: number;
}
