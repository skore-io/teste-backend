import { Test, TestingModule } from '@nestjs/testing'
import { ProvidersService } from '../../../providers/Domain/Services/providers.service'
import { Providers } from '../../../providers/Domain/Models/ObjectLists/providers'
import * as faker from 'faker'
import { Provider } from '../../../providers/Domain/Models/provider'
import utils from '../../../utils/utils'

describe('ProvidersService', () => {
  let service: ProvidersService
  let providers: Providers
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProvidersService],
    }).compile()

    service = module.get<ProvidersService>(ProvidersService)
    providers = {
      STKCRSUsyP0: {
        id: 'STKCRSUsyP0',
        name: 'youtube',
      },
    }
  })

  it('should find all providers', () => {
    expect(service.findAll()).toEqual(providers)
  })
  it('should create an provider', () => {
    const provider: Provider = {
      name: faker.name,
      id: utils.generateUniqueId(11),
    }
    expect(service.create(provider)).toEqual(provider)
  })
  it('should find a provider', () => {
    const provider: Provider = {
      name: faker.name,
      id: utils.generateUniqueId(11),
    }
    const expectedProvider: Provider = service.create(provider)
    expect(service.find(provider.id)).toEqual(expectedProvider)
  })
  it('should fail to find a provider', () => {
    const providerId = faker.hash

    expect(() => {
      service.find(providerId)
    }).toThrow(Error)
  })
  it('should update a provider', () => {
    const provider: Provider = {
      name: faker.name,
      id: utils.generateUniqueId(11),
    }
    const updatedProvider: Provider = {
      name: faker.name,
      id: provider.id,
    }
    service.create(provider)
    expect(service.update(updatedProvider)).toEqual(updatedProvider)
  })
  it('should fail to update a provider', () => {
    const provider: Provider = {
      name: faker.name,
      id: faker.hash,
    }
    expect(() => {
      service.update(provider)
    }).toThrow(Error)
  })
  it('should delete a provider', () => {
    const provider: Provider = {
      name: faker.name,
      id: utils.generateUniqueId(11),
    }
    service.create(provider)
    expect(service.delete(provider.id)).toEqual(provider)
  })
  it('should fail to delete a provider', () => {
    const provider: Provider = {
      name: faker.name,
      id: faker.hash,
    }
    expect(() => {
      service.delete(provider.id)
    }).toThrow(Error)
  })
})
