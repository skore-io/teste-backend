import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaRepository } from './media.repository';
import { MediaService } from './media.service';
import { MediaBO } from './media.bo';

@Module({
  controllers: [MediaController],
  providers: [MediaBO, MediaService, MediaRepository],
})
export class MediaModule { }
