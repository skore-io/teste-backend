import * as request from 'supertest'
import { HttpStatus, INestApplication } from '@nestjs/common'
import { Content } from '../../../contents/Domain/Models/content'
import { Contents } from '../../../contents/Domain/Models/ObjectLists/contents'
import { ContentsModule } from '../../../contents/contents.module'
import { Test } from '@nestjs/testing'

describe('Contents', () => {
  let app: INestApplication
  const content: Content = {
    id: 1,
    name: 'video',
    duration: 102,
    media_type: 'video',
    provider_id: 'STKCRSUsyP0',
    provider_name: 'youtube',
    expires_at: 16543651,
    watched: false,
    expired: false,
  }
  const contents: Contents = {
    1: {
      id: 1,
      name: 'video',
      duration: 102,
      media_type: 'video',
      provider_id: 'STKCRSUsyP0',
      provider_name: 'youtube',
      expires_at: 16543651,
      watched: false,
      expired: false,
    },
  }
  const service = {
    findAll: () => {
      return {}
    },
    find: () => content,
    create: () => content,
    update: () => content,
    delete: () => jest.fn(),
  }

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ContentsModule],
    })
      .overrideProvider(service)
      .useValue(service)
      .compile()

    app = moduleRef.createNestApplication()

    await app.init()
  })
  it('/GET contents', async () => {
    return request(app.getHttpServer())
      .get('/contents')
      .expect(HttpStatus.OK)
      .expect(service.findAll())
  })
  it('/POST contents', () => {
    return request(app.getHttpServer())
      .post('/contents')
      .send({ content })
      .expect(HttpStatus.CREATED)
      .expect(service.create())
  })
  it('/PUT contents', () => {
    return request(app.getHttpServer())
      .put('/contents')
      .send({ content })
      .expect(HttpStatus.OK)
      .expect(service.update())
  })
  it('/DELETE contents', () => {
    return request(app.getHttpServer())
      .delete(`/contents/${content.id}`)
      .expect(service.delete())
  })
})
