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
        const contentToPersist = {...contentDTO, watched: false, expired: false }
        this.db.persist(contentToPersist)
        return contentToPersist
    }
}
