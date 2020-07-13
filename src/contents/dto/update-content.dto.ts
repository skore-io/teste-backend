import { IsNumber, IsString, IsOptional } from 'class-validator'

export class UpdateContentDTO {
  @IsString()
  @IsOptional()
  name: string

  @IsNumber()
  @IsOptional()
  duration?: number

  @IsString()
  @IsOptional()
  provider?: string

  @IsString()
  @IsOptional()
  media_type?: string

  @IsString()
  @IsOptional()
  provider_id?: string

  @IsNumber()
  @IsOptional()
  expires_at?: number

  watched?: boolean = false
}
