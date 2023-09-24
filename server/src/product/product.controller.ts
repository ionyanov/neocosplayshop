import { Body, Controller, Delete, Get, HttpCode, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { Admin } from 'src/_security';
import { ProductDto } from './product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @HttpCode(200)
  @Get()
  getProducts() {
    return this.productService.getProducts(undefined);
  }

  @HttpCode(200)
  @Get('/popular')
  getPopular() {
    return this.productService.getProducts({ isPopular: true });
  }

  @HttpCode(200)
  @Get('/sales')
  getSales() {
    return this.productService.getProducts({ isOnsales: true });
  }

  @Admin()
  @HttpCode(200)
  @Get('/:id')
  getProduct(@Param('id') id: number) {
    return this.productService.getProduct(+id);
  }

  @Admin()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  setProduct(@Body() data: ProductDto) {
    return this.productService.setProduct(data);
  }

  @Admin()
  @HttpCode(200)
  @Delete('/:id')
  delProduct(@Param('id') id: number) {
    return this.productService.delProduct(+id);
  }

}
