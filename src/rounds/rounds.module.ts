import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Round } from './round.entity';
import { RoundsService } from './rounds.service';
import { RoundsController } from './rounds.controller';
import { GamesModule } from 'src/games/games.module';
import { UsersModule } from 'src/users/users.module';
import { RoundInformationsModule } from 'src/round-informations/roundInformations.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Round]),
    GamesModule,
    UsersModule,
    RoundInformationsModule,
  ],
  providers: [RoundsService],
  controllers: [RoundsController],
})
export class RoundsModule {}
