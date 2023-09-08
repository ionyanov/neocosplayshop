import { Module } from '@nestjs/common';
import { SettingsService } from './settings.service';
import { SettingsController } from './settings.controller';
import { PrismaService } from 'src/prisma.service';
import { LogService } from 'src/log.service';

@Module({
  controllers: [SettingsController],
  providers: [SettingsService, PrismaService, LogService],
})
export class SettingsModule { }
