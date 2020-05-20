import { Module } from '@nestjs/common';
import { ContentsController } from './controllers/contents.controller';
import { CreateContent } from './use-cases/create-content';
import { InMemoryRepository } from './repository/in-memory-repository';
import { Repository } from './use-cases/repository';
@Module({
  controllers: [ContentsController],
  providers: [
    CreateContent,
    {
      provide: 'Repository',
      useClass: InMemoryRepository,
    },
  ],
})
export class ContentsModule {}
