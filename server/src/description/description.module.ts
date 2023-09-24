import { Module } from '@nestjs/common';
import { DescriptionService } from './description.service';
import { DescriptionController } from './description.controller';
import { LogService } from 'src/log.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [DescriptionController],
  providers: [DescriptionService, PrismaService, LogService],
})
export class DescriptionModule {}
