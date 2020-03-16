import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MediaRepository } from './media.repository';
import MediaExceptions from './media.exceptions';
import { Media } from './media.entitity';
import { Utils } from '../../utils';

@Injectable()
export class MediaBO {
  constructor(private readonly mediaRepository: MediaRepository, private readonly utils: Utils) { }

  /**
   * Lança exceção caso mídia existente na base de dados.
   * 
   * @param id number
   * @returns void
   */
  checkExistingMedia(id: number): Media {
    const media = this.mediaRepository.findById(id);

    if (media) throw new InternalServerErrorException({ message: MediaExceptions.EXISTINT_MEDIA });

    return media;
  }

  /**
   * Busca mídia por Id.
   * Lança exceção caso mídia não encontrada.
   * 
   * @param id number
   * @returns Midia
   */
  getMidia(id: number): Media {
    const media = this.mediaRepository.findById(id);

    if (!media) throw new InternalServerErrorException({ message: MediaExceptions.MEDIA_NOT_FOUND });

    return media;
  }

  /**
   * Atribui a propriedade 'expired' a uma mídia.
   * A propriedade 'expired' é verdadeira quando expires_at for menor que a data atual.
   * 
   * @param media Media
   * @returns void
   */
  isExpired(media: Media): void {
    const now = this.utils.getUTCTimestamp();

    media.expired = media.expires_at < now ? true : false;
  }

  /**
   * Atribui a propriedade 'watched' a uma mídia.
   * A propriedade 'watched' é verdadeira quando o conteúdo já tiver sido obtido alguma vez.
   * 
   * @param media Media
   * @returns void
   */
  isWatched(media: Media): Media {
    if (media.watched) return media;

    const mediaCopy = { ...media };

    mediaCopy.watched = false; // Retorna cópia da primeira mídia detalhada como não assistida
    media.watched = true; // Altera mídia em memória para assistida

    return mediaCopy;
  }
}
