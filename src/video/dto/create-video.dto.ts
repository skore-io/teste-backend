import { Equals, IsIn, IsNotEmpty, IsNumber, MinLength, Validate } from 'class-validator'
import { MediaTypeEnum } from '../enum/media-type.enum'
import { VideoUniqueValidator } from '../validators/video-unique.validator'

export class CreateVideoDto {
  @IsNotEmpty()
  @IsNumber()
  @Validate(VideoUniqueValidator)
  readonly id: number

  @IsNotEmpty()
  @MinLength(10, {
    message: 'Name is too short',
  })
  readonly name: string

  @IsNotEmpty()
  @IsNumber()
  readonly duration: number

  @IsNotEmpty()
  @MinLength(5, {
    message: 'Provider is too short',
  })
  readonly provider: string

  @IsNotEmpty()
  readonly provider_id: string

  @IsNotEmpty()
  @IsIn([MediaTypeEnum.VIDEO])
  readonly media_type: MediaTypeEnum

  @Equals(undefined)
  readonly watched: boolean

  @IsNotEmpty()
  readonly expires_at: Date

  @Equals(undefined)
  readonly created_at: Date

  @Equals(undefined)
  readonly updated_at: Date

  @Equals(undefined)
  readonly expires: boolean
}
