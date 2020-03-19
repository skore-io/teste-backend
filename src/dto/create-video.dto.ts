import { IsNotEmpty } from 'class-validator';

export class CreateVideoDto {
  readonly provider: string;
  readonly media_type: string;
  readonly provider_id: string;
  readonly duration: number;
  
  @IsNotEmpty()
  readonly name: string;
  
  @IsNotEmpty()
  readonly expires_at: number;  
  
  @IsNotEmpty()
  readonly id: number;
}

