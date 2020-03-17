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

  getMedia(id: number): Media {
    const media = this.mediaBO.getMidia(id);

    this.mediaBO.isExpired(media);

    return this.mediaBO.isWatched(media);
  }

  updateMedia(newMedia: Media): Media {
    return newMedia;
  }
}
