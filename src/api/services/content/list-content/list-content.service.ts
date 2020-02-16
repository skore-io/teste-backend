import { Inject, Injectable } from '@nestjs/common';
import AbstractService from '../../AbstractService';
import FakeDbService from '../../../../db/fake-db/fake-db.service';

@Injectable()
export class ListContentService extends AbstractService {

    constructor(@Inject(FakeDbService) db) {
        super(db)
    }

    process() {
        return this.db.list()
    }
}
