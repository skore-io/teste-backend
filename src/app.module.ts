import { Module } from '@nestjs/common';
import { ContentController } from './content/content.controller';
import { ContentService } from './content/content.service';
import { RepositoryService } from './content/repository.service';

@Module({
  imports: [],
  controllers: [ContentController],
  providers: [ContentService, RepositoryService],
})
export class AppModule {}
