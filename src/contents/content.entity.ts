import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  Column,
  BeforeUpdate,
  AfterLoad,
} from 'typeorm';

import { EnumProviders } from '../common/enums/providers.enum';
import { EnumMediaType } from '../common/enums/media-type.enum';

@Entity('contents')
export class ContentEntity extends BaseEntity {
  @PrimaryColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  duration: number;

  @Column({ type: 'enum', enum: EnumProviders })
  provider: EnumProviders;

  @Column({ type: 'enum', enum: EnumMediaType })
  mediaType: EnumMediaType;

  @Column({ type: 'varchar' })
  providerId: string;

  @Column({ type: 'bigint' })
  expiresAt: number;

  @Column({ type: 'bool', nullable: false, default: false })
  watched: boolean;

  expired: boolean;

  @BeforeUpdate()
  resetWatched() {
    this.watched = false;
  }

  @AfterLoad()
  calcExpiration() {
    this.expired = this.expiresAt < new Date().getTime();
  }
}
