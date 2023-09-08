import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Auth } from 'src/auth/auth.decorator';
import { CategoryService } from './category.service';
import { CategoryDto } from './category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @HttpCode(200)
  @Get()
  getMenu() {
    return this.categoryService.getMenu();
  }

  @Auth()
  @HttpCode(200)
  @Post()
  create(@Body() categoryDto: CategoryDto) {
    return this.categoryService.upsert(0, categoryDto);
  }

  @Auth()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Patch(':id')
  update(@Param('id') id: string, @Body() categoryDto: CategoryDto) {
    return this.categoryService.upsert(+id, categoryDto);
  }

  @Auth()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
