import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { HttpException, HttpStatus} from '@nestjs/common';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private proRepo : Repository<Product>
  ) {}

  async createP(createProductDto: CreateProductDto) {
    const newproduct = await this.proRepo.create(createProductDto)
    await this.proRepo.save(newproduct)
    return newproduct

  }

  async findAll() {
    return await this.proRepo.find()
  }

  async findOne(id: string) {
    const foundproduct = await this.proRepo.findOneBy({id})
    if (foundproduct) return foundproduct
    throw new HttpException('xxx', HttpStatus.NOT_FOUND)
  }

  async updateP(id: string, updateProductDto: UpdateProductDto) {
    await this.proRepo.update(id, updateProductDto)
    const updatedproduct = await this.proRepo.findOneBy({id})
    if (!updatedproduct) throw new HttpException('xxx', HttpStatus.NOT_FOUND)
    return updatedproduct
  }

  async deleteP(id: string) {
    const deleteresponse = await this.proRepo.delete(id)
    if (!deleteresponse.affected) throw new HttpException('xxx', HttpStatus.NOT_FOUND) 
    return "deleted"
  }
}
