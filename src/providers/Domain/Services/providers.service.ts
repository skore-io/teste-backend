import { Injectable } from '@nestjs/common'
import { Providers } from '../Models/ObjectLists/providers'
import { Provider } from '../Models/provider'
import utils from '../../../utils/utils'

@Injectable()
export class ProvidersService {
  private readonly providers: Providers = {
    STKCRSUsyP0: {
      id: 'STKCRSUsyP0',
      name: 'youtube',
    },
  }
  findAll(): Providers {
    return this.providers
  }
  create(newProvider: Provider): Provider {
    let id = newProvider.id
    if (!id) {
      id = utils.generateUniqueId(11)
    }
    this.providers[id] = {
      ...newProvider,
    }

    return this.providers[id]
  }
  find(providerId: string): Provider {
    const provider: Provider = this.providers[providerId]
    if (!provider) {
      throw new Error('Provider not found')
    }
    return provider
  }
  update(updatedProvider: Provider): Provider {
    if (!this.providers[updatedProvider.id]) {
      throw new Error('The related provider was not found to update')
    }
    this.providers[updatedProvider.id] = updatedProvider

    return this.providers[updatedProvider.id]
  }

  delete(providerId: string): Provider {
    const provider: Provider = this.providers[providerId]
    if (!provider) {
      throw new Error('Provider not found to delete')
    }
    delete this.providers[providerId]
    return provider
  }
}
