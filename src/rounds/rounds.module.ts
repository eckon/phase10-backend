import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Round } from './round.entity';
import { RoundsService } from './rounds.service';
import { RoundsController } from './rounds.controller';
import { GamesModule } from '../games/games.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Round]),
    GamesModule,
    UsersModule,
  ],
  providers: [RoundsService],
  controllers: [RoundsController],
})
export class RoundsModule {}
