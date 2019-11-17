import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { User } from '../users/user.entity';
import { Round } from '../rounds/round.entity';

@Entity('game')
export class Game {
  @PrimaryGeneratedColumn()
  @ApiModelProperty({ readOnly: true })
  id: number;

  @Column({ length: 512 })
  @ApiModelProperty()
  title: string;

  @ManyToMany(type => User)
  @JoinTable()
  @ApiModelProperty()
  users: User[];

  @OneToMany(type => Round, round => round.game)
  @ApiModelProperty()
  rounds: Round[];
}
