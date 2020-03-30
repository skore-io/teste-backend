import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module';
import { HttpException, HttpStatus } from '@nestjs/common';


describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ get content by id', () => {
    return request(app.getHttpServer())
      .get('/content/:id')
      .expect(404)
      .expect({statusCode:404,message:"não encontrado"});
  });

  it('/ ADD', () => {
    return request(app.getHttpServer())
      .post('/content/add')
      .send({
          "id": 1,
          "name": "GOTO 2017 • The Many Meanings of Event-Driven Architecture • Martin Fowler",
          "duration": 3006,
          "provider": "youtube",
          "media_type": "video",
          "provider_id": "STKCRSUsyP0",
          "expires_at": 1580428851394,
        })
      .expect(201);
  });


  it('/ set content by id', () => {
    return request(app.getHttpServer())
      .put('/content/:id')
      .expect(404)
  });

});


describe('AppService ', () => {
  it('add service', () => {
    let app = new AppService();
    let result = app.createContent({
      "id": 1,
      "name": "GOTO 2017 • The Many Meanings of Event-Driven Architecture • Martin Fowler",
      "duration": 3006,
      "provider": "youtube",
      "media_type": "video",
      "provider_id": "STKCRSUsyP0",
      "expires_at": 1580428851394,
    })
    expect(result).toEqual([{
      "id": 1,
      "name": "GOTO 2017 • The Many Meanings of Event-Driven Architecture • Martin Fowler",
      "duration": 3006,
      "provider": "youtube",
      "media_type": "video",
      "provider_id": "STKCRSUsyP0",
      "expires_at": 1580428851394,
      "watched": false
    }])
  });


  it('getContentById', () => {
    let app = new AppService();
    expect(() => {
      app.getContentById('1')
    }).toThrow(new HttpException('não encontrado', HttpStatus.NOT_FOUND)) 
  });

  it('setContentById', () => {
    let app = new AppService();
    expect(() => {
      app.setContentById('1', {
        "id": 1,
        "name": "GOTO 2017 • The Many Meanings of Event-Driven Architecture • Martin Fowler",
        "duration": 3006,
        "provider": "youtube",
        "media_type": "video",
        "provider_id": "STKCRSUsyP0",
        "expires_at": 1580428851394,
        "watched": false
      })
    })
    .toThrow(new HttpException('não encontrado', HttpStatus.NOT_FOUND)) 
    
  });

  it('removeContentById', () => {
    let app = new AppService();
    expect(() => {
      app.removeContentById('1')
    }).toThrow(new HttpException('não encontrado', HttpStatus.NOT_FOUND)) 
  });


});
