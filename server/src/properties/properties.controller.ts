import { Body, Controller, Delete, Get, HttpCode, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { Admin, Auth } from 'src/_security';
import { PropertyDto, ValuesDto } from './properties.dto';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) { }

  @HttpCode(200)
  @Get()
  getActive() {
    return this.propertiesService.getAll(true);
  }

  @Admin()
  @HttpCode(200)
  @Get('/admin')
  getAll() {
    return this.propertiesService.getAll(false);
  }

  @Admin()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  upsert(@Body() data: PropertyDto) {
    return this.propertiesService.upsert(data);
  }

  @Admin()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('/:id')
  setValues(@Param('id') id: number, @Body() data: ValuesDto) {
    return this.propertiesService.setValue(+id, data);
  }

  @Admin()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Delete('/:propId/:id')
  deleteValue(@Param('propId') propId: number, @Param('id') id: number) {
    return this.propertiesService.deleteValue(+propId, +id);
  } 1
}
