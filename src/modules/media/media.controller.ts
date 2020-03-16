import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { Media } from './media.entitity';
import { MediaService } from './media.service';
import { MediaDTO } from './media.dto';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) { }

  @Get(':id')
  public getMedia(@Param('id') idMedia: number): Media {
    return this.mediaService.getMedia(idMedia);
  }

  @Post('/')
  public createMedia(@Body() media: MediaDTO): Media {
    return this.mediaService.createMedia(media);
  }
}
