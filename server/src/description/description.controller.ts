import { Body, Controller, Delete, Get, HttpCode, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { DescriptionService } from './description.service';
import { Admin } from 'src/_security';
import { IDescriptionDto } from './description.dto';

@Controller('product/:idProd/description')
export class DescriptionController {
  constructor(private readonly descriptionService: DescriptionService) { }

  @HttpCode(200)
  @Get()
  getDescription(@Param('idProd') idProd: number) {
    return this.descriptionService.getDescription(+idProd);
  }

  @Admin()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  setDescription(@Param('idProd') idProd: number, @Body() data: IDescriptionDto) {
    return this.descriptionService.setDescription(+idProd, data);
  }

  @Admin()
  @HttpCode(200)
  @Delete(':idDescr')
  delDescription(@Param('idProd') idProd: number, @Param('idDescr') idDescr: number) {
    return this.descriptionService.delDescription(+idProd, +idDescr);
  }
}
