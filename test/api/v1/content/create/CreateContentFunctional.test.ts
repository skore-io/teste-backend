import * as request from 'supertest';
import { BASIC_BODY, CREATE_CONTENT_URL } from '../../../../constants/constants'
import { INestApplication } from '@nestjs/common';
import { INVALID_ID } from '../../../../../src/messages/messages';
import { buildServerApp } from '../../../../utils/ServerCreator'

describe('CreateContent', () => {
    let app: INestApplication;

    beforeEach(async () => {
        app = await buildServerApp()
        await app.init()
    })

    it('should create a new content', done => {
        request(app.getHttpServer()).post(CREATE_CONTENT_URL)
            .send(BASIC_BODY)
            .expect(201, { response: {...BASIC_BODY, watched: false, expired: false} })
            .end((err, res) => err? done(err) : done())
    });

    it('should not create new content with existing id', async done => {
        await request(app.getHttpServer()).post(CREATE_CONTENT_URL)
            .send(BASIC_BODY)

        request(app.getHttpServer()).post('/api/v1/content/create')
            .send(BASIC_BODY)
            .expect(422, { error: INVALID_ID })
            .end((err, res) => err? done(err) : done())
    })
});

