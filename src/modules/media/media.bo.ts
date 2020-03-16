import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MediaRepository } from './media.repository';
import MediaExceptions from './media.exceptions';

@Injectable()
export class MediaBO {
  constructor(private readonly mediaRepository: MediaRepository) { }

  /**
   * Lança exceção caso mídia existente na base de dados.
   * 
   * @param id number
   * @returns void
   */
  checkExistingMedia(id: number): void {
    const media = this.mediaRepository.findById(id);

    if (media) throw new InternalServerErrorException({ message: MediaExceptions.EXISTINT_MEDIA });
  }
}
