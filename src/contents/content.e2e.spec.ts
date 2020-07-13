import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication, HttpStatus } from '@nestjs/common';
import { ContentsService } from './contents.service';
import { newDummyContentDTO } from './content-spec-helper';
import { Content } from './content.model';
import { ContentsModule } from './contents.module';
import { classToPlain } from 'class-transformer';

describe('Contents', () => {
  let app: INestApplication
  let contentsService: ContentsService
  let content: Content
  let appRequest: request.SuperTest<request.Test>

  beforeAll(async () => {
    contentsService = new ContentsService()

    const moduleRef = await Test.createTestingModule({
      imports: [ContentsModule]
    })
      .overrideProvider(ContentsService)
      .useValue(contentsService)
      .compile()

    app = moduleRef.createNestApplication();
    await app.init()
    appRequest = request(app.getHttpServer())
  })

  beforeEach(() => {
    contentsService.deleteAll()
    content = contentsService.create(newDummyContentDTO())
  })

  describe('GET /contents/:id', () => {
    describe('when id present', () => {
      it('returns the content', async () => {
        let content = contentsService.findOne(1)
        await request(app.getHttpServer())
          .get('/contents/1')
          .expect(HttpStatus.OK, classToPlain(content))
      })

      it('marks as seen', async () => {
        expect(content.watched).toBe(false)
        await appRequest
          .get('/contents/1')
          .expect(HttpStatus.OK)
          .then(res => {
            expect(res.body.watched).toBe(true)
          })
      })
    })

    describe('when id not present', () => {
      it('returns 404', async () => {
        await appRequest
          .get('/contents/invalid_id')
          .expect(HttpStatus.NOT_FOUND)
      })
    })
  })

  describe('GET /contents', () => {
    it('returns all contents', async () => {
      let contents = contentsService.findAll()
      await appRequest
        .get('/contents')
        .expect(HttpStatus.OK, classToPlain(contents))
    })
  })

  describe('POST /contents', () => {
    let postData = {
      id: 2,
      name: "GOTO 2017 • The Many Meanings of Event-Driven Architecture • Martin Fowler",
      duration: 3006,
      provider: "youtube",
      media_type: "video",
      provider_id: "STKCRSUsyP0",
      expires_at: 1594529916936
    }

    it('persists the content', async () => {
      await appRequest
        .post('/contents')
        .send(postData)
        .expect(HttpStatus.CREATED)

      await appRequest
        .get('/contents/' + postData.id)
        .expect(HttpStatus.OK)
    })

    describe('watched', () => {
      it('starts as false', async () => {
        await appRequest
          .post('/contents')
          .send(postData)
          .expect(HttpStatus.CREATED)

        const createdContent = contentsService.findById(postData.id)
        expect(createdContent.watched).toBe(false)
      })
    })

    describe('when id already present', () => {
      it('returns 400', async () => {
        await appRequest
          .post('/contents')
          .send({ ...postData, id: 1 })
          .expect(HttpStatus.BAD_REQUEST)
      })
    })
  })

  describe('PATCH /contents/:id', () => {
    describe('when id present', () => {
      it('updates the content', async () => {
        const newName = 'this will be the new content name'
        await appRequest
          .patch('/contents/1')
          .send({ name: newName })
          .expect(HttpStatus.OK)

        let updatedContent = contentsService.findOne(1)
        expect(updatedContent.name).toBe(newName)
      })

      it('marks as unseen', async () => {
        let content = contentsService.findOne(1)
        expect(content.watched).toBe(true)

        await appRequest
          .patch('/contents/1')
          .send({ name: 'new name' })
          .expect(HttpStatus.OK)

        expect(content.watched).toBe(false)
      })
    })

    describe('when id not present', () => {
      it('returns 404', async () => {
        await appRequest
          .patch('/contents/22')
          .expect(HttpStatus.NOT_FOUND)
      })
    })
  })

  describe('DELETE /contents/:id', () => {
    describe('when id present', () => {
      it('deletes the content', async () => {
        await appRequest
          .delete('/contents/1')
          .expect(HttpStatus.OK)

        await appRequest
          .get('/contents/1')
          .expect(HttpStatus.NOT_FOUND)
      })
    })

    describe('when id not present', () => {
      it('returns 404', async () => {
        await appRequest
          .delete('/contents/22')
          .expect(HttpStatus.NOT_FOUND)
      })
    })
  })

  afterAll(async () => {
    await app.close()
  })
})