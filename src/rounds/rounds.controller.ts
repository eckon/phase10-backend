import { Get, Controller, Param, Post, Body } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Round } from './round.entity';
import { RoundsService } from './rounds.service';
import { PostRound } from '../modules/PostRound';
import { PostRoundResult } from '../modules/PostRoundResult';

@Controller('rounds')
export class RoundsController {
  constructor(private readonly roundsService: RoundsService) {}

  @Get()
  @ApiResponse({ status: 200, type: Round, isArray: true })
  async get(): Promise<Round[]> {
    return await this.roundsService.findAll();
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: Round })
  async getById(@Param() params: any): Promise<Round> {
    const id = Number(params.id);
    return await this.roundsService.findById(id);
  }

  @Post()
  @ApiResponse({ status: 201, type: PostRoundResult })
  async insert(@Body() post: PostRound): Promise<PostRoundResult> {
    return await this.roundsService.insertPostRound(post);
  }
}
