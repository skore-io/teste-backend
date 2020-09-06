import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator'

export class Content {
  @IsNumber() @IsOptional() readonly id: number
  @IsString() readonly name: string
  @IsNumber() readonly duration: number
  @IsString() readonly media_type: string
  @IsString() readonly provider_id: string
  @IsString() @IsOptional() readonly provider_name: string
  @IsNumber() expires_at: number
  @IsBoolean() @IsOptional() readonly watched: boolean
  @IsBoolean() @IsOptional() readonly expired: boolean
}
