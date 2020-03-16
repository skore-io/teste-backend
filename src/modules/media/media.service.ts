import { Injectable } from '@nestjs/common';
import { Media } from './media.entitity';
import { MediaBO } from './media.bo';
import { MediaRepository } from './media.repository';

@Injectable()
export class MediaService {
  constructor(private readonly mediaBO: MediaBO, private readonly mediaRepository: MediaRepository) { }

  createMedia(media: Media): Media {
    this.mediaBO.checkExistingMedia(media.id);

    return this.mediaRepository.create(media);
  }
}
