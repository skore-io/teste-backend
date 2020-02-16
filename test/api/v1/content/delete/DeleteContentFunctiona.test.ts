import * as request from 'supertest';
import { BASIC_BODY } from '../../../../constants/constants'
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../../../src/app.module';
import { INVALID_ID, DELETE_OK, OBJECT_NOT_EXISTS } from '../../../../../src/messages/messages'

describe('DeleteContent', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
    
        app = moduleFixture.createNestApplication();
        await (await app.init());
    })

    it('should throw an error because not exist a content with id 0', done => {
        request(app.getHttpServer()).delete('/api/v1/content/delete/0')
            .expect(422, { error: OBJECT_NOT_EXISTS })
            .end((err, res) => err? done(err) : done())
    })

    it('should delete a existing content', async done => {
        await request(app.getHttpServer()).post('/api/v1/content/create')
            .send(BASIC_BODY)

        request(app.getHttpServer()).delete('/api/v1/content/delete/1')
            .expect(200, { response: DELETE_OK })
            .end((err, res) => err? done(err) : done())
    })
});

