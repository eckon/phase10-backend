import { Injectable } from '@nestjs/common';
import { Cat } from './interfaces/cat.interface';
import { CreateCatDto } from './dto/create-cat.dto';

@Injectable()
export class CatsService {

  create(createCatDto: CreateCatDto): void {
    return;
  }

  findAll(): Cat[] {
    return [];
  }
}
