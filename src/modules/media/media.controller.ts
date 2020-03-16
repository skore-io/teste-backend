import { Controller, Post, Body } from '@nestjs/common';
import { Media } from './media.entitity';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) { }

  @Post('/')
  public async createMedia(@Body() media: Media): Promise<Media> {
    return await this.mediaService.createMedia(media);
  }
}
