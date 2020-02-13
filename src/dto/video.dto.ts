import { ApiProperty } from "@nestjs/swagger"

export class VideoDto {
  @ApiProperty()
  readonly _id: number
  @ApiProperty()
  readonly name: String
  @ApiProperty()
  readonly duration: number
  @ApiProperty()
  readonly provider: string
  @ApiProperty()
  readonly media_type: string
  @ApiProperty()
  readonly provider_id: string
  @ApiProperty()
  readonly expires_at: Date
  @ApiProperty()
  readonly watched: boolean
  @ApiProperty({})
  readonly expired: boolean
}