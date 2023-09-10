import { Body, Controller, Delete, Get, HttpCode, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { Admin } from 'src/_security/decorators';
import { SettingsDto } from './settings.dto';
import { SettingsService } from './settings.service';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) { }

  @HttpCode(200)
  @Get()
  findAll() {
    return this.settingsService.getAll();
  }

  @Admin()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post()
  create(@Body() settingDto: SettingsDto) {
    return this.settingsService.upsert(settingDto);
  }

  @Admin()
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.settingsService.remove(name);
  }
}
