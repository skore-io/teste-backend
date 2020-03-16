import { Injectable } from '@nestjs/common';
import { Media } from './media.entitity';

@Injectable()
export class MediaService {
  async createMedia(media: Media): Promise<Media> {
    return new Media({});
  }
}
