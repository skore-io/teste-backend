import { EnumProviders } from '../common/enums/providers.enum';
import { EnumMediaType } from '../common/enums/media-type.enum';

export interface IContentId {
  readonly id: number;
}

export interface IContentCreate {
  readonly id: number;
  readonly name: string;
  readonly duration: number;
  readonly provider: EnumProviders;
  readonly mediaType: EnumMediaType;
  readonly providerId: string;
  readonly expiresAt: number;
}

export interface IContentCreated {
  readonly id: number;
  readonly isCreated: boolean;
}

export interface IContentRead {
  readonly id: number;
}

export interface IContentReaded {
  readonly id: number;
  readonly name: string;
  readonly duration: number;
  readonly provider: EnumProviders;
  readonly mediaType: EnumMediaType;
  readonly providerId: string;
  readonly expiresAt: number;
  readonly watched: boolean;
  readonly expired: boolean;
}

export interface IContentUpdate {
  readonly name: string;
  readonly duration: number;
  readonly provider: EnumProviders;
  readonly mediaType: EnumMediaType;
  readonly providerId: string;
  readonly expiresAt: number;
}

export interface IContentUpdated {
  readonly id: number;
  readonly isUpdated: boolean;
}

export interface IContentDelete {
  readonly id: number;
}

export interface IContentDeleted {
  readonly id: number;
  readonly isDeleted: boolean;
}
