import { Inject, Injectable } from '@nestjs/common';

import AbstractService from '../../AbstractService';
import FakeDbService from '../../../../db/fake-db/fake-db.service';

import * as moment from 'moment'

@Injectable()
export class GetContentService extends AbstractService {

    constructor(@Inject(FakeDbService) db) {
        super(db)
    }

    process(id : Number) {
        const content = this.db.findBy(id)

        const todayDate = moment()
        const expiresDay = moment.unix(content.expires_at)

        content.expired = todayDate.isAfter(expiresDay)
        content.watched = true

        return content
    }
}
