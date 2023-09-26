import { Body, Controller, Delete, Get, HttpCode, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProdPropertiesService } from './prodproperties.service';
import { Admin } from 'src/_security';
import { IProdPropertiesDto } from './prodproperties.dto';

@Controller('product/:idProd')
export class ProdPropertiesController {
  constructor(private readonly prodPropertiesService: ProdPropertiesService) { }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get('catproperties')
  getCategoryProperties(@Param('idProd') idProd: number) {
    return this.prodPropertiesService.getCategoryProperties(+idProd);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Get('/properties')
  getProperties(@Param('idProd') idProd: number) {
    return this.prodPropertiesService.getProperties(+idProd);
  }

  @Admin()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('/properties')
  setProperties(@Param('idProd') idProd: number, @Body() data: IProdPropertiesDto) {
    return this.prodPropertiesService.setProperties(+idProd, data);
  }
  @Admin()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Delete('/properties/:idProp')
  delProperties(@Param('idProd') idProd: number, @Param('idProp') idProp: number) {
    return this.prodPropertiesService.delProperties(+idProd, +idProp);
  }
}
