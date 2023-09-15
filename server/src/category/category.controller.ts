import { Body, Controller, Delete, Get, HttpCode, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Admin } from 'src/_security/decorators';
import { CategoryService } from './category.service';
import { CategoryDto } from './category.dto';

@Controller('')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @HttpCode(200)
  @Get('mainmenu')
  getMenu() {
    return this.categoryService.getMenu();
  }

  @Admin()
  @HttpCode(200)
  @Get('category')
  getCategories() {
    return this.categoryService.getAll();
  }

  @Admin()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('category')
  upsertCategory(@Body() categoryDto: CategoryDto) {
    return this.categoryService.upsert(categoryDto);
  }

  @Admin()
  @HttpCode(200)
  @Delete('category/:id')
  removeCategory(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }

  @Admin()
  @HttpCode(200)
  @Post('category/:catId/:propId')
  addProperties(@Param('catId') catId: string, @Param('propId') propId: string) {
    return this.categoryService.addProperties(+catId, +propId);
  }

  @Admin()
  @HttpCode(200)
  @Delete('category/:catId/:propId')
  removeProperties(@Param('catId') catId: string, @Param('propId') propId: string) {
    return this.categoryService.removeProperties(+catId, +propId);
  }
}
