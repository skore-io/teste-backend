import { Module } from '@nestjs/common';
import { ContentsService } from './contents/contents.service';
import { ContentsController } from './contents/contents.controller';

@Module({
  imports: [],
  controllers: [ContentsController],
  providers: [ContentsService],
})
export class AppModule {}
