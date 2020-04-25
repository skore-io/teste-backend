import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsPositive,
  IsEnum,
} from 'class-validator';
import { Expose } from 'class-transformer';

import { EnumProviders } from '../../common/enums/providers.enum';
import { EnumMediaType } from '../../common/enums/media-type.enum';

export class DtoContentUpdate {
  @IsNotEmpty()
  @IsString()
  public readonly name: string;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  public readonly duration: number;

  @IsNotEmpty()
  @IsString()
  @IsEnum(EnumProviders, {
    message: `provider must be a value in [${Object.keys(EnumProviders)
      .join(', ')
      .toLocaleLowerCase()}]`,
  })
  public readonly provider: EnumProviders;

  @IsNotEmpty({ message: 'media_type should not be empty' })
  @IsString({ message: 'media_type must be a string' })
  @IsEnum(EnumMediaType, {
    message: `media_type must be a value in [${Object.keys(EnumMediaType)
      .join(', ')
      .toLocaleLowerCase()}]`,
  })
  @Expose({ name: 'media_type' })
  public readonly mediaType: EnumMediaType;

  @IsNotEmpty({ message: 'provider_id should not be empty' })
  @IsString({ message: 'provider_id must be a string' })
  @Expose({ name: 'provider_id' })
  public readonly providerId: string;

  @IsNotEmpty({ message: 'expires_at should not be empty' })
  @IsInt({ message: 'expires_at should be a Unix timestamp' })
  @IsPositive({ message: 'expires_at must be a positive number' })
  @Expose({ name: 'expires_at' })
  public readonly expiresAt: number;
}
