import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>) {}

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findByName(name: string): Promise<Product> {
    const result = await this.productRepository.find({ name });
    return result[0];
  }
}
