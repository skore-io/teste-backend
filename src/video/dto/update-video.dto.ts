import { Equals, IsIn, IsNumber, IsOptional, MinLength } from 'class-validator'
import { MediaTypeEnum } from '../enum/media-type.enum'

export class UpdateVideoDto {
  @Equals(undefined)
  readonly id: number

  @IsOptional()
  @MinLength(10, {
    message: 'Name is too short',
  })
  readonly name: string

  @IsOptional()
  @IsNumber()
  readonly duration: number

  @IsOptional()
  @MinLength(5, {
    message: 'Provider is too short',
  })
  readonly provider: string

  @IsOptional()
  readonly provider_id: string

  @IsOptional()
  @IsIn([MediaTypeEnum.VIDEO])
  readonly media_type: MediaTypeEnum

  @Equals(undefined)
  readonly watched: boolean

  @IsOptional()
  readonly expires_at: Date

  @Equals(undefined)
  readonly created_at: Date

  @Equals(undefined)
  readonly updated_at: Date

  @Equals(undefined)
  readonly expires: boolean
}
