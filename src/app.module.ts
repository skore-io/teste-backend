import { Module } from '@nestjs/common';
import { FakeDbService } from './db/fake-db/fake-db.service';
import { CreateContentService } from './services/content/create-content/create-content.service';
import { UpdateContentService } from './services/content/update-content/update-content.service';
import { DeleteContentService } from './services/content/delete-content/delete-content.service';
import { ListContentService } from './services/content/list-content/list-content.service';

@Module({
    imports: [],
    controllers: [],
    providers: [FakeDbService, CreateContentService, UpdateContentService, DeleteContentService, ListContentService],
})
export class AppModule {}
