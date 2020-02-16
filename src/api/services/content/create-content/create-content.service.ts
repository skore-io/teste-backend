import { Injectable, Inject } from '@nestjs/common';
import AbstractService  from '../../AbstractService';
import FakeDbService from '../../../../db/fake-db/fake-db.service';
import ContentDTO from '../../../dtos/ContentDTO';

@Injectable()
export class CreateContentService extends AbstractService {

    constructor(@Inject(FakeDbService) db) {
        super(db)
    }

    process(contentDTO : ContentDTO) {
        return this.db.persist(contentDTO)
    }
}
