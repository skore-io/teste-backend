import { Injectable } from '@nestjs/common';
import { Media } from './media.entitity';

@Injectable()
export class MediaRepository {
  medias: Media[];

  constructor() {
    this.medias = [];
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

  /**
   * Altera mídia em memória.
   * 
   * @param newMedia Media
   * @param oldMedia Media
   * @returns media
   */
  update(newMedia: Media, oldMedia: Media): Media {
    for (const key in newMedia) {
      if (newMedia.hasOwnProperty(key) && oldMedia.hasOwnProperty(key)) {
        oldMedia[key] = newMedia[key];
      }
    }

    return oldMedia;
  }

  /**
   * Remove mídia em memória.
   * 
   * @param idMedia number
   * @returns void
   */
  remove(id: number): void {
    const media = this.findById(id);

    this.medias.splice(this.medias.indexOf(media), 1);
  }
}
