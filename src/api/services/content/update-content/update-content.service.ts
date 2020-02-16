import { Injectable, Inject } from '@nestjs/common';
import AbstractService from '../../AbstractService';
import FakeDbService from '../../../../db/fake-db/fake-db.service';
import ContentDTO from '../../../dtos/ContentDTO';

@Injectable()
export class UpdateContentService extends AbstractService {

    constructor(@Inject(FakeDbService) db) {
        super(db)
    }

    process(content : ContentDTO) {
        return this.db.merge(content)
    }
}
