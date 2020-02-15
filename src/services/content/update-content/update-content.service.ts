import { Injectable, Inject } from '@nestjs/common';
import AbstractService from 'src/services/AbstractService';
import { FakeDbService } from 'src/db/fake-db/fake-db.service';
import ContentDTO from 'src/dto/ContentDTO';

@Injectable()
export class UpdateContentService extends AbstractService {

    constructor(@Inject(FakeDbService) db) {
        super(db)
    }

    process(content : ContentDTO) {
        return this.db.merge(content)
    }
}
