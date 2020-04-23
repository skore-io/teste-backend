import { EnumProviders } from '../../common/enums/providers.enum';
import { EnumMediaType } from '../../common/enums/media-type.enum';

export class DtoContentCreate {
  public readonly id: number;
  public readonly name: string;
  public readonly duration: number;
  public readonly provider: EnumProviders;
  public readonly mediaType: EnumMediaType;
  public readonly providerId: string;
  public readonly expiresAt: number;
}
