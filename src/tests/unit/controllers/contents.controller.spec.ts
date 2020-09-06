import { Test, TestingModule } from '@nestjs/testing'
import { ContentsController } from '../../../contents/Http/Controllers/contents.controller'
import { ContentsService } from '../../../contents/Domain/Services/contents.service'
import { ProvidersService } from '../../../providers/Domain/Services/providers.service'
import { Content } from '../../../contents/Domain/Models/content'
import { Contents } from '../../../contents/Domain/Models/ObjectLists/contents'

describe('ContentsController', () => {
  let controller: ContentsController
  let service: ContentsService
  const content: Content = {
    id: 1,
    name: 'video',
    duration: 102,
    media_type: 'video',
    provider_id: '4541dsd',
    provider_name: 'teste',
    expires_at: 16543651,
    watched: false,
    expired: false,
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContentsController],
      providers: [ContentsService, ProvidersService],
    }).compile()

    service = module.get<ContentsService>(ContentsService)
    controller = module.get<ContentsController>(ContentsController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  it('should find all contents', async () => {
    const contents: Contents = {}
    jest.spyOn(service, 'findAll').mockImplementation(() => contents)

    expect(await controller.findAll()).toEqual(contents)
  })
  it('should find a content', async () => {
    const contentId: number = content.id
    jest.spyOn(service, 'find').mockImplementation(() => content)

    expect(await controller.find(contentId)).toEqual(content)
  })
  it('should create a content', async () => {
    jest.spyOn(service, 'create').mockImplementation(() => content)

    expect(await controller.create(content)).toEqual(content)
  })
  it('should update a content', async () => {
    jest.spyOn(service, 'update').mockImplementation(() => content)
    expect(await controller.update(content)).toEqual(content)
  })
  it('should delete a content', async () => {
    const contentId: number = content.id
    jest.spyOn(service, 'delete').mockImplementation(() => content)

    expect(await controller.delete(contentId)).toEqual(content)
  })
})
