import * as request from 'supertest';
import { BASIC_BODY } from '../../../../constants/constants'
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../../../src/app.module';

describe('CreateContent', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
    
        app = moduleFixture.createNestApplication();
        await (await app.init());
    })

    it('should create a new content', done => {
        request(app.getHttpServer()).post('/api/v1/content/create')
            .send(BASIC_BODY)
            .expect(201, { response: {...BASIC_BODY, watched: false, expired: false} })
            .end((err, res) => err? done(err) : done())
    });

    it('should not create new content with existing id', async done => {
        await request(app.getHttpServer()).post('/api/v1/content/create')
            .send(BASIC_BODY)

        request(app.getHttpServer()).post('/api/v1/content/create')
            .send(BASIC_BODY)
            .expect(422, { error: "Id inválido" })
            .end((err, res) => err? done(err) : done())
    })
});

