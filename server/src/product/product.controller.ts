import { Body, Controller, Delete, Get, HttpCode, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { Admin } from 'src/_security';
import { ProductDescriptionDto, ProductDto, ProductPropertiesDto } from './product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @HttpCode(200)
  @Get()
  getProduct() {
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
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  setProduct(@Body() data: ProductDto) {
    return this.productService.setProduct(data);
  }

  @Admin()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Delete('/:id')
  delProduct(@Param('id') id: number) {
    return this.productService.delProduct(+id);
  }

  /** Description */
  @Admin()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get('/:idProd/description')
  getDescription(@Param('idProd') idProd: number) {
    return this.productService.getDescription(+idProd);
  }
  @Admin()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('/:idProd/description')
  setDescription(@Param('idProd') idProd: number, @Body() data: ProductDescriptionDto) {
    return this.productService.setDescription(+idProd, data);
  }
  @Admin()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Delete('/:idProd/description/:idDescr')
  delDescription(@Param('idProd') idProd: number, @Param('idDescr') idDescr: number) {
    return this.productService.delDescription(+idProd, idDescr);
  }

  /** Property */
  @Admin()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get('/:idProd/catproperties')
  getCategoryProperties(@Param('idProd') idProd: number) {
    return this.productService.getCategoryProperties(+idProd);
  }
  @Admin()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get('/:idProd/properties')
  getProperties(@Param('idProd') idProd: number) {
    return this.productService.getProperties(+idProd);
  }
  @Admin()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('/:idProd/properties')
  setProperties(@Param('idProd') idProd: number, @Body() data: ProductPropertiesDto) {
    return this.productService.setProperties(+idProd, data);
  }
  @Admin()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Delete('/:idProd/properties/:idProp')
  delProperties(@Param('idProd') idProd: number, @Param('idProp') idProp: number) {
    return this.productService.delProperties(+idProd, +idProp);
  }

}
