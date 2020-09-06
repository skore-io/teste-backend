import * as request from 'supertest'
import { HttpStatus, INestApplication } from '@nestjs/common'
import { Providers } from '../../../providers/Domain/Models/ObjectLists/providers'
import { Test } from '@nestjs/testing'
import { ProvidersModule } from '../../../providers/providers.module'
import { Provider } from '../../../providers/Domain/Models/provider'

describe('Providers', () => {
  let app: INestApplication
  const provider: Provider = {
    id: 'STKCRSUsyP0',
    name: 'youtube',
  }
  const providers: Providers = {
    STKCRSUsyP0: {
      id: 'STKCRSUsyP0',
      name: 'youtube',
    },
  }
  const service = {
    findAll: () => providers,
    find: () => providers['STKCRSUsyP0'],
    create: () => providers['STKCRSUsyP0'],
    update: () => providers['STKCRSUsyP0'],
    delete: () => providers['STKCRSUsyP0'],
  }

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ProvidersModule],
    })
      .overrideProvider(service)
      .useValue(service)
      .compile()

    app = moduleRef.createNestApplication()

    await app.init()
  })
  it('/GET providers', () => {
    return request(app.getHttpServer())
      .get('/providers')
      .expect(HttpStatus.OK)
      .expect(service.findAll())
  })
  it('/POST providers', () => {
    return request(app.getHttpServer())
      .post('/providers')
      .send({ provider })
      .expect(HttpStatus.CREATED)
      .expect(service.create())
  })
  it('/PUT providers', () => {
    return request(app.getHttpServer())
      .put('/providers')
      .send({ provider })
      .expect(HttpStatus.OK)
      .expect(service.update())
  })
  it('/DELETE providers', () => {
    return request(app.getHttpServer())
      .delete(`/providers/${provider.id}`)
      .expect(HttpStatus.OK)
      .expect(service.delete())
  })
})
