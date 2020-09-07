import * as request from 'supertest'
import { Test } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { VideoService } from './services/video.service'
import { VideoModule } from './video.module'

describe('Videos', () => {
  let app: INestApplication
  const videoService = { findAll: () => ['test'] }

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [VideoModule],
    })
      .overrideProvider(VideoService)
      .useValue(videoService)
      .compile()

    app = moduleRef.createNestApplication()
    await app.init()
  })

  it(`/GET videos`, () => {
    return request(app.getHttpServer())
      .get('videos')
      .expect(200)
      .expect({
        data: videoService.findAll(),
      })
  })

  afterAll(async () => {
    await app.close()
  })
})
