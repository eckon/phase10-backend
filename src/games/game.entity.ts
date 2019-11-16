import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { ApiModelProperty } from '@nestjs/swagger';
import { User } from '../users/user.entity';

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
}
