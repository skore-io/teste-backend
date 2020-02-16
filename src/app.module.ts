import { Module } from '@nestjs/common';
import FakeDbService from './db/fake-db/fake-db.service';
import { CreateContentService } from './api/services/content/create-content/create-content.service';
import { UpdateContentService } from './api/services/content/update-content/update-content.service';
import { DeleteContentService } from './api/services/content/delete-content/delete-content.service';
import { GetContentService } from './api/services/content/get-content/get-content.service';
import { CreateContentController } from './api/controllers/v1/content/create-content/create-content.controller';
import { UpdateContentController } from './api/controllers/v1/content/update-content/update-content.controller';
import { GetContentController } from './api/controllers/v1/content/get-content/get-content.controller';
import { DeleteContentController } from './api/controllers/v1/content/delete-content/delete-content.controller';

@Module({
    imports: [],
    controllers: [CreateContentController, UpdateContentController, GetContentController, DeleteContentController],
    providers: [FakeDbService, CreateContentService, UpdateContentService, DeleteContentService, GetContentService],
})
export class AppModule {}
