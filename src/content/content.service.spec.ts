import { Test, TestingModule } from '@nestjs/testing'
import { ContentService } from './content.service'
import { RepositoryService } from './repository.service'

describe('ContentService', () => {
  let contentService: ContentService
  let repositoryService: RepositoryService
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

  const repositoryStub = {
    selectById: (id: number) => Promise.resolve(contentMock),
    insert: () => Promise.resolve(),
    update: () => Promise.resolve(),
    deleteById: () => Promise.resolve(),
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContentService, RepositoryService],
    })
      .overrideProvider(repositoryService)
      .useValue(repositoryStub)
      .compile()

    contentService = module.get<ContentService>(ContentService)
    repositoryService = module.get<RepositoryService>(RepositoryService)
  })

  it('should be defined', () => {
    expect(contentService).toBeDefined()
  })

  it('getById should return content if inserted', async () => {
    jest.spyOn(repositoryService, 'selectById').mockResolvedValueOnce(contentMock)
    const repositorySpy = jest.spyOn(repositoryService, 'selectById')
    const content = await contentService.getById(1)

    expect(content).toStrictEqual({ ...contentMock, watched: true, expired: true })
    expect(repositorySpy).toHaveBeenCalledWith(1)
  })

  it('getById should return undefined if doesnt exists content with provided id', async () => {
    jest.spyOn(repositoryService, 'selectById').mockResolvedValueOnce(undefined)
    const repositorySpy = jest.spyOn(repositoryService, 'selectById')
    const content = await contentService.getById(1)

    expect(content).toBe(undefined)
    expect(repositorySpy).toHaveBeenCalled()
  })

  it('insert should sucess called with correct values', async () => {
    const contentSpy = jest.spyOn(repositoryService, 'selectById').mockResolvedValueOnce(undefined)
    await contentService.insert(contentMock)
    expect(contentSpy).toHaveBeenCalled()
  })

  it('insert should throw if id already exists', async () => {
    const contentSpy = jest.spyOn(repositoryService, 'selectById')
    try {
      await contentService.insert(contentMock)
    } catch (error) {
      expect(error.message).toBe('alreadyExists')
    }
    expect(contentSpy).toHaveBeenCalled()
  })

  it('updateById should success with correct values', async () => {
    const contentSpy = jest.spyOn(repositoryService, 'update').mockResolvedValueOnce()
    await contentService.updateById(contentMock)
    expect(contentSpy).toHaveBeenCalled()
  })

  it('deleteById should success with inserted id', async () => {
    const contentSpy = jest.spyOn(repositoryService, 'deleteById').mockResolvedValueOnce()
    await contentService.deleteById(1)
    expect(contentSpy).toHaveBeenCalled()
  })
})
