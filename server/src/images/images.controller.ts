import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ImagesService } from './images.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Admin } from 'src/_security';
import { IImagesDto } from './images.dto';

@Controller('images/:propId')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) { }

  @Post('upload')
  @Admin()
  @HttpCode(200)
  @UseInterceptors(FilesInterceptor('files'))
  public async onUpload(@Param('propId') propId: string, @UploadedFiles() files: Array<Express.Multer.File>) {
    this.imagesService.addImages(+propId, files);
  }

  @HttpCode(200)
  @Get()
  public async getImages(@Param('propId') propId: string) {
    return this.imagesService.getImages(+propId);
  }

  @Admin()
  @HttpCode(200)
  @Post()
  public async setImages(@Param('propId') propId: string, @Body() data: IImagesDto) {
    return this.imagesService.setImages(+propId, data);
  }

  @Admin()
  @HttpCode(200)
  @Delete(':imgId')
  public async delImages(@Param('propId') propId: string, @Param('imgId') imgId: string) {
    return this.imagesService.delImages(+propId, +imgId);
  }

  @Admin()
  @HttpCode(200)
  @Post(':imgId')
  public async setMain(@Param('propId') propId: string, @Param('imgId') imgId: string) {
    return this.imagesService.setMain(+propId, +imgId);
  }
}
