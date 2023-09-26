import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { LogService } from 'src/log.service';
import { PrismaService } from 'src/prisma.service';
import { ImagesService } from 'src/images/images.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService, PrismaService, LogService, ImagesService],
})
export class ProductModule { }
