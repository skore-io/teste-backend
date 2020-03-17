import { IsNumber, IsNotEmpty, IsString, IsOptional } from 'class-validator';
export class MediaDTO {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  duration: number;

  @IsOptional()
  @IsString()
  provider: string;

  @IsOptional()
  @IsString()
  media_type: string;

  @IsOptional()
  @IsString()
  provider_id: string;

  @IsOptional()
  @IsNumber()
  expires_at: number;

  constructor(partial: Partial<MediaDTO>) {
    Object.assign(this, partial);
  }
}