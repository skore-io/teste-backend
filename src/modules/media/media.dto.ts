import { IsNumber, IsNotEmpty, IsString } from 'class-validator';
export class MediaDTO {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  duration: number;

  @IsNotEmpty()
  @IsString()
  provider: string;

  @IsNotEmpty()
  @IsString()
  media_type: string;

  @IsNotEmpty()
  @IsString()
  provider_id: string;

  @IsNotEmpty()
  @IsNumber()
  expires_at: number;

  constructor(partial: Partial<MediaDTO>) {
    Object.assign(this, partial);
  }
}