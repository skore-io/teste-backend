import { Controller, Post, Body, Get, Param, ParseIntPipe, Patch, Delete } from '@nestjs/common';
import { Media } from './media.entitity';
import { MediaService } from './media.service';
import { MediaDTO } from './media.dto';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) { }

  @Get(':id')
  public getMedia(@Param('id', new ParseIntPipe()) idMedia): Media {
    return this.mediaService.getMedia(idMedia);
  }

  @Delete('/:id')
  public removeMedia(@Param('id', new ParseIntPipe()) idMedia): void {
    return this.mediaService.removeMedia(idMedia);
  }

  @Post('/')
  public createMedia(@Body() media: MediaDTO): Media {
    return this.mediaService.createMedia(media);
  }

  @Patch('/')
  public updateMedia(@Body() media: MediaDTO): Media {
    return this.mediaService.updateMedia(media);
  }
}
