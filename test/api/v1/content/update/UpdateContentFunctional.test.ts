import * as request from 'supertest';
import { BASIC_BODY, UPDATE_CONTENT_URL, CREATE_CONTENT_URL } from '../../../../constants/constants'
import { INestApplication } from '@nestjs/common';
import { OBJECT_NOT_EXISTS } from '../../../../../src/messages/messages';
import { buildServerApp } from '../../../../utils/ServerCreator'

describe('UpdateContent', () => {
    let app: INestApplication;

    beforeEach(async () => {
        app = await buildServerApp()
        await app.init()
    })

    it('should throw an error because not exist a content with id 0', async done => {
        request(app.getHttpServer()).post(UPDATE_CONTENT_URL)
            .send({...BASIC_BODY, id: 0}).expect(422, { error: OBJECT_NOT_EXISTS })
            .end((err, res) => err? done(err) : done())
    })

    it('should update a existing content', async done => {
        await request(app.getHttpServer()).post(CREATE_CONTENT_URL)
            .send(BASIC_BODY)

        request(app.getHttpServer()).post(UPDATE_CONTENT_URL)
            .send({...BASIC_BODY, media_type: 'doc'})
            .expect(200, { response: {...BASIC_BODY, media_type: 'doc', watched: false, expired: false} })
            .end((err, res) => err? done(err) : done())
    })
});

