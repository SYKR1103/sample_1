import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createP(@Body() createProductDto: CreateProductDto) {
    return this.productService.createP(createProductDto);
  }

  @Get("all")
  async findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  async updateP(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.updateP(id, updateProductDto);
  }

  @Delete(':id')
  async deleteP(@Param('id') id: string) {
    return this.productService.deleteP(id);
  }
}
