import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaRepository } from './media.repository';
import { MediaService } from './media.service';
import { MediaBO } from './media.bo';
import { Utils } from 'src/utils';

@Module({
  controllers: [MediaController],
  providers: [MediaBO, MediaService, MediaRepository, Utils],
})
export class MediaModule { }
