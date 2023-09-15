import { Module } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { PropertiesController } from './properties.controller';
import { LogService } from 'src/log.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PropertiesController],
  providers: [PropertiesService, PrismaService, LogService],
})
export class PropertiesModule { }
