import * as request from 'supertest';
import { BASIC_BODY, CREATE_CONTENT_URL, GET_CONTENT_URL } from '../../../../constants/constants'
import { INestApplication } from '@nestjs/common';
import { buildServerApp } from '../../../../utils/ServerCreator'

describe('GetContent', () => {
    let app: INestApplication;

    beforeEach(async () => {
        app = await buildServerApp()
        await app.init()
    })

    it('should list existing contents', async done => {
        await request(app.getHttpServer()).post(CREATE_CONTENT_URL).send(BASIC_BODY)
        
        request(app.getHttpServer()).get(`${GET_CONTENT_URL}/1`)
        .expect(200)
        .end((err, res) => err? done(err) : done())
    })
});

