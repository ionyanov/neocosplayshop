import { Body, Controller, Delete, Get, HttpCode, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Auth } from 'src/_security/decorators';
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

  @HttpCode(200)
  @Get('category')
  getAll() {
    return this.categoryService.getAll();
  }

  @Auth()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('category')
  upsert(@Body() categoryDto: CategoryDto) {
    return this.categoryService.upsert(categoryDto);
  }

  @Auth()
  @HttpCode(200)
  @Delete('category/:id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
