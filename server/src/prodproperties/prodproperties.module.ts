import { Module } from '@nestjs/common';
import { ProdPropertiesService } from './prodproperties.service';
import { ProdPropertiesController } from './prodproperties.controller';
import { LogService } from 'src/log.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [ProdPropertiesController],
  providers: [ProdPropertiesService, PrismaService, LogService],
})
export class ProdPropertiesModule { }
