import { ApiProperty } from '@nestjs/swagger';
import { Round } from 'src/rounds/round.entity';
import { RoundInformation } from 'src/round-informations/roundInformation.entity';

export class PostRoundResult {
  @ApiProperty({ type: () => Round })
  round: Round;

  @ApiProperty()
  information: RoundInformation[];
}
