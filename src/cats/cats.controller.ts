import {
  Controller,
  Get,
  Post,
  Body,
} from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { Cat } from './interfaces/cat.interface';

@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
    return {
      action: 'created',
      cat: createCatDto,
    };
  }

  @Get()
  findAll(): Cat[] {
    return this.catsService.findAll();
  }
}
