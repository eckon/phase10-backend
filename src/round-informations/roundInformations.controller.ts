import { Get, Controller, Param } from '@nestjs/common';
import { RoundInformationsService } from './roundInformations.service';
import { RoundInformation } from './roundInformation.entity';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('rounds')
@Controller('roundinformations')
export class RoundInformationsController {
  constructor(
    private readonly roundInformationsService: RoundInformationsService,
  ) {}

  @Get()
  @ApiResponse({ status: 200, type: RoundInformation, isArray: true })
  async get(): Promise<RoundInformation[]> {
    return await this.roundInformationsService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: RoundInformation })
  async getById(@Param() params: any): Promise<RoundInformation> {
    const id = Number(params.id);
    return await this.roundInformationsService.findById(id);
  }
}
