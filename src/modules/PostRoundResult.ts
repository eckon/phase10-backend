import { ApiModelProperty } from '@nestjs/swagger';
import { Round } from '../rounds/round.entity';
import { RoundInformation } from '../round-informations/roundInformation.entity';

export class PostRoundResult {
  @ApiModelProperty()
  round: Round;

  @ApiModelProperty()
  information: RoundInformation[];
}
