import * as request from 'supertest';
import { BASIC_BODY } from '../../../../constants/constants'
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../../../src/app.module';

describe('UpdateContent', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
    
        app = moduleFixture.createNestApplication();
        await (await app.init());
    })

    it('should throw an error because not exist a content with id 0', async done => {
        request(app.getHttpServer()).post('/api/v1/content/update')
            .send({...BASIC_BODY, id: 0}).expect(422, { error: "Objeto não existe." })
            .end((err, res) => err? done(err) : done())
    })

    it('should update a existing content', async done => {
        await request(app.getHttpServer()).post('/api/v1/content/create')
            .send(BASIC_BODY)

        request(app.getHttpServer()).post('/api/v1/content/update')
            .send({...BASIC_BODY, media_type: 'doc'})
            .expect(200, { response: {...BASIC_BODY, media_type: 'doc', watched: false, expired: false} })
            .end((err, res) => err? done(err) : done())
    })
});

