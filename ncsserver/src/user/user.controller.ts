import { Body, Controller, Get, HttpCode, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { AdminUserDto, PasswordDto, UserDto } from './user.dto';
import { Admin, Auth } from 'src/_security/decorators';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Auth()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Patch(':id')
  updateOne(@Param('id') id: string, @Body() userDto: UserDto) {
    return this.userService.updateOne(+id, userDto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  setPassword(@Body() passwordDto: PasswordDto) {
    return this.userService.setPassword(passwordDto);
  }

  @Admin()
  @HttpCode(200)
  @Get()
  getUsers() {
    return this.userService.getUsers();
  }

  @Admin()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  update(@Body() userDto: AdminUserDto) {
    return this.userService.update(userDto);
  }
}


