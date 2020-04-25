import { IContentReaded } from './content.interfaces';
import { EnumProviders } from '../common/enums/providers.enum';
import { EnumMediaType } from '../common/enums/media-type.enum';
import { Expose } from 'class-transformer';

export class ContentSerializer implements IContentReaded {
  id: number;

  name: string;

  duration: number;

  provider: EnumProviders;

  @Expose({ name: 'media_type' })
  mediaType: EnumMediaType;

  @Expose({ name: 'provider_id' })
  providerId: string;

  @Expose({ name: 'expires_at' })
  expiresAt: number;

  watched: boolean;

  expired: boolean;

  constructor(partial: Partial<ContentSerializer>) {
    Object.assign(this, partial);
  }
}
