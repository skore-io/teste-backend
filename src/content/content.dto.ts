import { IsString, IsNumber, IsBoolean } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { FullContent } from './content.service'

export class ContentDto implements Omit<FullContent, 'watched' | 'expired'> {
  @IsNumber()
  @ApiProperty()
  id: number

  @IsString()
  @ApiProperty()
  name: string

  @IsNumber()
  @ApiProperty()
  duration: number

  @IsString()
  @ApiProperty()
  provider: string

  @IsString()
  @ApiProperty()
  media_type: string

  @IsString()
  @ApiProperty()
  provider_id: string

  @IsNumber()
  @ApiProperty()
  expires_at: number
}
