import { Injectable } from '@nestjs/common';
import { Media } from './media.entitity';

@Injectable()
export class MediaRepository {
  medias: Media[];

  constructor() {
    this.medias = []
  }

  /**
   * Busca mídia por Id.
   * 
   * @param id number
   * @returns Media
   */
  findById(id: number): Media {
    return this.medias.find(media => media.id === id);
  }

  /**
   * Grava mídia em memória.
   * 
   * @param media Media
   * @returns Media
   */
  create(media: Media): Media {
    const newMedia = new Media(media);

    this.medias.push(newMedia);

    return newMedia;
  }
}
