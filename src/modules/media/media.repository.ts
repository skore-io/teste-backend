import { Injectable } from '@nestjs/common';
import { Media } from './media.entitity';

@Injectable()
export class MediaRepository {
  async findById(id: number): Promise<Media> {
    return new Media({ id });
  }
}
