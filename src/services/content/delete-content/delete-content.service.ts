import { Injectable, Inject } from '@nestjs/common';
import AbstractService from 'src/services/AbstractService';
import { FakeDbService } from 'src/db/fake-db/fake-db.service';

@Injectable()
export class DeleteContentService extends AbstractService {

    constructor(@Inject(FakeDbService) db) {
        super(db)
    }

    process(id : number) {
        return this.db.delete(id)
    }
}
