import { Module } from '@nestjs/common';
import FakeDbService from './db/fake-db/fake-db.service';
import { CreateContentService } from './api/services/content/create-content/create-content.service';
import { UpdateContentService } from './api/services/content/update-content/update-content.service';
import { DeleteContentService } from './api/services/content/delete-content/delete-content.service';
import { ListContentService } from './api/services/content/list-content/list-content.service';
import { CreateContentController } from './api/controllers/api/v1/content/create-content/create-content.controller';
import { UpdateContentController } from './api/controllers/api/v1/content/update-content/update-content.controller';
import { ListContentController } from './api/controllers/api/v1/content/list-content/list-content.controller';
import { DeleteContentController } from './api/controllers/api/v1/content/delete-content/delete-content.controller';

@Module({
    imports: [],
    controllers: [CreateContentController, UpdateContentController, ListContentController, DeleteContentController],
    providers: [FakeDbService, CreateContentService, UpdateContentService, DeleteContentService, ListContentService],
})
export class AppModule {}
