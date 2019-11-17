import { ApiModelProperty } from '@nestjs/swagger';
import { Round } from 'src/rounds/round.entity';
import { RoundInformation } from 'src/round-informations/roundInformation.entity';

export class PostRoundResult {
  @ApiModelProperty()
  round: Round;

  @ApiModelProperty()
  information: RoundInformation[];
}
