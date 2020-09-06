import { Injectable } from '@nestjs/common'
import { Content } from '../Models/content'
import { Contents } from '../Models/ObjectLists/contents'
import { ProvidersService } from '../../../providers/Domain/Services/providers.service'
import { isEmpty } from '@nestjs/common/utils/shared.utils'
import { Provider } from '../../../providers/Domain/Models/provider'
import moment = require('moment')

@Injectable()
export class ContentsService {
  private readonly contents: Contents
  private readonly providersService: ProvidersService

  constructor(providersService: ProvidersService) {
    this.providersService = providersService
    this.contents = {}
  }
  create(newContent: Content): Content {
    const id: number = this.generateContentId()
    const provider: Provider = this.providersService.find(newContent.provider_id)

    if (!provider) {
      throw new Error('The provider was not found')
    }

    this.contents[id] = {
      ...newContent,
      id,
      provider_name: provider.name,
    }

    return this.contents[id]
  }
  findAll(): Contents {
    return this.contents
  }
  find(contentId: number): Content {
    const content: Content = this.contents[contentId]
    if (!content) {
      throw new Error('Content not found')
    }
    const isExpired: boolean = ContentsService.verifyIfTheContentIsExpired(content.expires_at)
    this.update(content, true, isExpired)

    return this.contents[contentId]
  }
  update(updatedContent: Content, watched = false, expired = false): Content {
    const content: Content = this.contents[updatedContent.id]
    if (!content) {
      throw new Error('The related content was not found to update')
    }
    this.contents[updatedContent.id] = {
      ...updatedContent,
      watched,
      expired,
    }

    return this.contents[updatedContent.id]
  }
  delete(contentId: number): Content {
    const content: Content = this.contents[contentId]
    if (!content) {
      throw new Error('The related content was not found to delete')
    }

    delete this.contents[contentId]

    return content
  }
  private generateContentId(): number {
    if (isEmpty(this.contents)) return 1

    return this.contents[Object.keys(this.contents).length].id + 1
  }

  private static verifyIfTheContentIsExpired(expires_at: number): boolean {
    const expiresAt = moment(moment.utc(expires_at * 1000))

    return expiresAt.isSameOrAfter(moment())
  }
}
