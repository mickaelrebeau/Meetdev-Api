import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Get('/:id')
  getById(@Param('id') id: string) {
    return this.imageService.getByUserId(id);
  }

  @Post('upload/:id')
  uploadFile(@Param('id') id: string, @Body() file: any) {
    this.imageService.uploadFile(file, id);
    return;
  }
}
