import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MediaRepository } from './media.repository';
import MediaExceptions from './media.exceptions';
import { Media } from './media.entitity';

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

  /**
   * Atribui a propriedade 'expired' a uma mídia.
   * A propriedade 'expired' é verdadeira quando expires_at for menor que a data atual.
   * 
   * @param media Media
   * @returns Media
   */
  isExpired(media: Media): Media {
    return media;
  }

  /**
   * Atribui a propriedade 'watched' a uma mídia.
   * A propriedade 'watched' é verdadeira quando o conteúdo já tiver sido obtido alguma vez.
   * 
   * @param media Media
   * @returns Media
   */
  isWatched(media: Media): Media {
    return media;
  }
}
