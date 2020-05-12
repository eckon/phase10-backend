import { ApiProperty } from '@nestjs/swagger';
import { Round } from '../rounds/round.entity';
import { RoundInformation } from '../round-informations/roundInformation.entity';

export class PostRoundResult {
  @ApiProperty({ type: () => Round })
  round: Round;

  @ApiProperty()
  information: RoundInformation[];
}
