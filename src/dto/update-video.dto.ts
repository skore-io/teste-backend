import { IsNotEmpty } from 'class-validator';

export class UpdateVideoDto {
  readonly duration: number;
  readonly provider: string;
  readonly media_type: string;
  readonly provider_id: string;

  @IsNotEmpty()
  readonly name: string;
  
  @IsNotEmpty()
  readonly expires_at: number;    
  
  readonly id: number;
}

