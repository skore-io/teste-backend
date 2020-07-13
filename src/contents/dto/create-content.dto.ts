import { IsNumber, IsString, IsDefined } from 'class-validator'

export class CreateContentDTO {
  @IsNumber()
  @IsDefined()
  id: number

  @IsString()
  @IsDefined()
  name: string

  @IsNumber()
  @IsDefined()
  duration: number

  @IsString()
  @IsDefined()
  provider: string

  @IsString()
  @IsDefined()
  media_type: string

  @IsString()
  @IsDefined()
  provider_id: string

  @IsNumber()
  @IsDefined()
  expires_at: number

  @IsDefined()
  watched = false

  @IsDefined()
  expired = false
}
