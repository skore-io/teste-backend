import { HttpStatus } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import { ContentController } from './content.controller'
import { ContentDto } from './content.dto'
import { ContentService, EXCEPTIONS } from './content.service'

describe('ContentController', () => {
  let controller: ContentController
  let service: ContentService

  const contentMock = {
    id: 1,
    name: 'GOTO 2017 • The Many Meanings of Event-Driven Architecture • Martin Fowler',
    duration: 3006,
    provider: 'youtube',
    media_type: 'video',
    provider_id: 'STKCRSUsyP0',
    expires_at: 1580428851394,
    watched: false,
    expired: false,
  }

  const contentServiceStub = {
    insert: (content: ContentDto) => Promise.resolve(),
    getById: (id: number) => Promise.resolve(contentMock),
    updateById: () => Promise.resolve(),
    deleteById: () => Promise.resolve(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContentController],
      providers: [ContentService],
    })
      .overrideProvider(ContentService)
      .useValue(contentServiceStub)
      .compile()

    controller = module.get<ContentController>(ContentController)
    service = module.get<ContentService>(ContentService)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should not throw when POST with correct values', async () => {
    const serviceSpy = jest.spyOn(service, 'insert')

    await controller.post(contentMock)

    expect(serviceSpy).toHaveBeenCalled()
  })

  it('should throw when POST with inserted id', async () => {
    const serviceSpy = jest
      .spyOn(service, 'insert')
      .mockRejectedValueOnce(EXCEPTIONS.ALREADY_EXISTS)
    try {
      await controller.post(contentMock)
    } catch (error) {
      expect(error).toBe(EXCEPTIONS.ALREADY_EXISTS)
    }
  })

  it('should return an object when GET with inserted id', async () => {
    const serviceSpy = jest.spyOn(service, 'getById')
    const content = await controller.findById(1)

    expect(serviceSpy).toHaveBeenCalled()
    expect(content).toBe(contentMock)
  })

  it('should throws when GET with UNinserted id', async () => {
    const serviceSpy = jest.spyOn(service, 'getById').mockResolvedValueOnce(undefined)
    const controllerSpy = jest.spyOn(controller, 'findById')
    try {
      await controller.findById(1)
    } catch (error) {
      expect(error.getStatus()).toBe(HttpStatus.NO_CONTENT)
    }

    expect(serviceSpy).toHaveBeenCalled()
  })

  it('should not throw when PUT with correct values', async () => {
    const serviceSpy = jest.spyOn(service, 'updateById')

    await controller.update(contentMock)

    expect(serviceSpy).toHaveBeenCalled()
  })

  it('should not throw when DELETE with correct id', async () => {
    const serviceSpy = jest.spyOn(service, 'deleteById')

    await controller.deleteById(1)

    expect(serviceSpy).toHaveBeenCalled()
  })
})
