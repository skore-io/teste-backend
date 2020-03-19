import { Exclude } from 'class-transformer';

export class VideoListingEntity {
  id: number;
  name: string;
  duration: number;
  provider: string;
  media_type: string;
  provider_id: string;
  expires_at: number;
  
  @Exclude()
  watched?: boolean;

  constructor(partial: Partial<VideoListingEntity>) {
    Object.assign(this, partial);
  }
}