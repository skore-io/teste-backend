import { Injectable, Inject } from '@nestjs/common';
import AbstractService from '../../AbstractService';
import FakeDbService from '../../../../db/fake-db/fake-db.service';
import ContentDTO from '../../../dtos/ContentDTO';

@Injectable()
export class UpdateContentService extends AbstractService {

    constructor(@Inject(FakeDbService) db) {
        super(db)
    }

    process(contentDTO : ContentDTO) {
        const content = this.db.findBy(contentDTO.id)
        
        Object.keys(contentDTO).forEach(key => content[key] = contentDTO[key])
        content.watched = false

        return this.db.merge(content)
    }
}
