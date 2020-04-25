import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContentRepository } from './content.repository';
import { ContentsService } from './contents.service';
import { ContentsController } from './contents.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ContentRepository])],
  exports: [],
  controllers: [ContentsController],
  providers: [ContentsService],
})
export class ContentsModule {}
