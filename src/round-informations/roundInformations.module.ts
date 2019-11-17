import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoundInformationsService } from './roundInformations.service';
import { RoundInformationsController } from './roundInformations.controller';
import { RoundInformation } from './roundInformation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoundInformation])],
  providers: [RoundInformationsService],
  controllers: [RoundInformationsController],
  exports: [RoundInformationsService],
})
export class RoundInformationsModule {}
