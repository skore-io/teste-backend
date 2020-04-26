/* eslint-disable @typescript-eslint/camelcase */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { getRepositoryToken } from '@nestjs/typeorm';

import { ContentsModule } from '../src/contents/contents.module';
import { ContentRepository } from '../src/contents/content.repository';
import { ContentsService } from '../src/contents/contents.service';
import { HttpLoggingInterceptor } from '../src/common/interceptors/http-logging.interceptor';
import { TestInterceptor } from './utils/dependencies/test.interceptor';

describe('ContentsModule (e2e)', () => {
  let app: INestApplication;
  const service = {
    contentCreate: jest.fn(),
    contentRead: jest.fn(),
    contentUpdate: jest.fn(),
    contentDelete: jest.fn(),
  };

  const contentCreate = {
    id: 1,
    name:
      'GOTO 2017 • The Many Meanings of Event-Driven Architecture • Martin Fowler',
    duration: 3006,
    provider: 'youtube',
    media_type: 'video',
    provider_id: 'STKCRSUsyP0',
    expires_at: 1580428851394,
  };

  const contentUpdate = {
    id: 1,
    name:
      'GOTO 2017 • The Many Meanings of Event-Driven Architecture • Martin Fowler',
    duration: 3006,
    provider: 'youtube',
    media_type: 'video',
    provider_id: 'STKCRSUsyP0',
    expires_at: 1580428851394,
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ContentsModule],
    })
      .overrideInterceptor(HttpLoggingInterceptor)
      .useClass(TestInterceptor)
      .overrideProvider(ContentsService)
      .useValue(service)
      .overrideProvider(getRepositoryToken(ContentRepository))
      .useValue({})
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it('POST /contents/', () => {
    return request(app.getHttpServer())
      .post('/contents')
      .send(contentCreate)
      .expect(201);
  });

  it('GET /contents/1', () => {
    return request(app.getHttpServer())
      .get('/contents/1')
      .expect(200);
  });

  it('PUT /contents/1', () => {
    return request(app.getHttpServer())
      .put('/contents/1')
      .send(contentUpdate)
      .expect(200);
  });

  it('DEL /contents/1', () => {
    return request(app.getHttpServer())
      .del('/contents/1')
      .expect(200);
  });
});
