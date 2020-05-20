import { Module } from '@nestjs/common';
import { ContentsController } from './controllers/contents.controller';
import { CreateContent } from './use-cases/create-content';

@Module({
  controllers: [ContentsController],
  providers: [CreateContent],
})
export class ContentsModule {}
