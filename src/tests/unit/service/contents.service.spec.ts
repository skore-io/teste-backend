import { Test, TestingModule } from '@nestjs/testing'
import { ContentsService } from '../../../contents/Domain/Services/contents.service'
import { ProvidersService } from '../../../providers/Domain/Services/providers.service'
import { Providers } from '../../../providers/Domain/Models/ObjectLists/providers'
import * as faker from 'faker'
import { Content } from '../../../contents/Domain/Models/content'

describe('ContentsService', () => {
  let service: ContentsService
  let providers: Providers
  let providersService: ProvidersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContentsService, ProvidersService],
    }).compile()

    providersService = module.get<ProvidersService>(ProvidersService)
    service = module.get<ContentsService>(ContentsService)
    providers = {
      STKCRSUsyP0: {
        id: 'STKCRSUsyP0',
        name: 'youtube',
      },
    }
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
  it('should find all contents', () => {
    expect(service.findAll()).toEqual({})
  })
  it('should create a new content', () => {
    jest.spyOn(providersService, 'find').mockImplementation(() => providers['STKCRSUsyP0'])
    const content: Content = {
      id: 1,
      name: 'video',
      duration: 102,
      media_type: 'video',
      provider_id: providers['STKCRSUsyP0'].id,
      provider_name: providers['STKCRSUsyP0'].name,
      expires_at: 16543651,
      watched: false,
      expired: false,
    }
    expect(service.create(content)).toEqual(content)
  })
  it('should find a content', () => {
    const content: Content = {
      id: 1,
      name: 'video',
      duration: 102,
      media_type: 'video',
      provider_id: providers['STKCRSUsyP0'].id,
      provider_name: providers['STKCRSUsyP0'].name,
      expires_at: 16543651,
      watched: false,
      expired: false,
    }
    const expectedContent: Content = {
      id: 1,
      name: 'video',
      duration: 102,
      media_type: 'video',
      provider_id: providers['STKCRSUsyP0'].id,
      provider_name: providers['STKCRSUsyP0'].name,
      expires_at: 16543651,
      watched: true,
      expired: false,
    }
    service.create(content)
    const updatedContent = service.find(content.id)
    expect(updatedContent).toEqual(expectedContent)
    expect(updatedContent.watched).toBeTruthy()
  })
  it('should fail to find a content', () => {
    const contentId = faker.number

    expect(() => {
      service.find(contentId)
    }).toThrow(Error)
  })

  it('should update a content', () => {
    const content: Content = {
      id: 1,
      name: 'video',
      duration: 102,
      media_type: 'video',
      provider_id: providers['STKCRSUsyP0'].id,
      provider_name: providers['STKCRSUsyP0'].name,
      expires_at: 16543651,
      watched: false,
      expired: false,
    }
    const expectedContent: Content = {
      id: 1,
      name: faker.name,
      duration: 102,
      media_type: faker.name,
      provider_id: providers['STKCRSUsyP0'].id,
      provider_name: providers['STKCRSUsyP0'].name,
      expires_at: 16543651,
      watched: false,
      expired: false,
    }
    service.create(content)

    expect(service.update(expectedContent)).toEqual(expectedContent)
  })
  it('should fail to update a content', () => {
    const content: Content = {
      id: faker.number,
      name: 'video',
      duration: 102,
      media_type: 'video',
      provider_id: providers['STKCRSUsyP0'].id,
      provider_name: providers['STKCRSUsyP0'].name,
      expires_at: 16543651,
      watched: false,
      expired: false,
    }
    expect(() => {
      service.update(content)
    }).toThrow(Error)
  })
  it('should delete a content', () => {
    const content: Content = {
      id: 1,
      name: 'video',
      duration: 102,
      media_type: 'video',
      provider_id: providers['STKCRSUsyP0'].id,
      provider_name: providers['STKCRSUsyP0'].name,
      expires_at: 16543651,
      watched: false,
      expired: false,
    }
    service.create(content)

    expect(service.delete(content.id)).toEqual(content)
  })
  it('should fail to delete a content', () => {
    const contentId = faker.number

    expect(() => {
      service.delete(contentId)
    }).toThrow(Error)
  })
})
