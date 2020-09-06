import { Test, TestingModule } from '@nestjs/testing'
import { ProvidersController } from '../../../providers/Http/Controllers/providers.controller'
import { ProvidersService } from '../../../providers/Domain/Services/providers.service'
import { Provider } from '../../../providers/Domain/Models/provider'
import { Providers } from '../../../providers/Domain/Models/ObjectLists/providers'

describe('ProvidersController', () => {
  let controller: ProvidersController
  let service: ProvidersService
  const provider: Provider = {
    name: 'youtuber',
    id: '1f54f4f5',
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProvidersController],
      providers: [ProvidersService],
    }).compile()

    service = module.get<ProvidersService>(ProvidersService)

    controller = module.get<ProvidersController>(ProvidersController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
  it('should create a provider', async () => {
    jest.spyOn(service, 'create').mockImplementation(provider => provider)

    expect(await controller.create(provider)).toEqual(provider)
  })
  it('should find a provider', async () => {
    const providerId: string = provider.id
    jest.spyOn(service, 'find').mockImplementation(() => provider)

    expect(await controller.find(providerId)).toEqual(provider)
  })
  it('should find all providers', async () => {
    const providers: Providers = {}

    jest.spyOn(service, 'findAll').mockImplementation(() => providers)

    expect(await controller.findAll()).toEqual(providers)
  })
  it('should update a provider', async () => {
    jest.spyOn(service, 'update').mockImplementation(provider => provider)

    expect(await controller.update(provider)).toEqual(provider)
  })
  it('should delete a provider', async () => {
    const providerId: string = provider.id
    jest.spyOn(service, 'delete').mockImplementation(() => provider)

    expect(await controller.delete(providerId)).toEqual(provider)
  })
})
