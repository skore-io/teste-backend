import { Expose } from 'class-transformer';

export class VideoEntity {
  id: number;
  name: string;
  duration: number;
  provider: string;
  media_type: string;
  provider_id: string;
  expires_at: number;
  watched?: boolean;
  
  @Expose()
  get expired(): boolean {
    let timestampNow = new Date().getTime();
    return this.expires_at < timestampNow;
  }

  constructor(partial: Partial<VideoEntity>) {
    Object.assign(this, partial);
  }
}