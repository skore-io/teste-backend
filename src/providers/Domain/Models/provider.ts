import { IsNumber, IsOptional, IsString } from 'class-validator'

export class Provider {
  @IsString() @IsOptional() readonly id: string
  @IsString() readonly name: string
}
