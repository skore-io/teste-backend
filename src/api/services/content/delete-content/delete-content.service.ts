import { Injectable, Inject } from '@nestjs/common';
import AbstractService from '../../AbstractService';
import FakeDbService from '../../../../db/fake-db/fake-db.service';

@Injectable()
export class DeleteContentService extends AbstractService {

    constructor(@Inject(FakeDbService) db) {
        super(db)
    }

    process(id : number) {
        return this.db.delete(id)
    }
}
