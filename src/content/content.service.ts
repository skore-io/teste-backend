import { Inject, Injectable } from '@nestjs/common'
import { ContentDto } from './content.dto'
import { RepositoryService } from './repository.service'

export interface FullContent {
  id: number
  name: string
  duration: number
  provider: string
  media_type: string
  provider_id: string
  expires_at: number
  watched?: boolean
  expired?: boolean
}

export enum EXCEPTIONS {
  ALREADY_EXISTS = 'alreadyExists',
}

@Injectable()
export class ContentService {
  @Inject()
  private readonly contentRepository: RepositoryService
  async getById(id: number): Promise<FullContent> {
    const content = await this.contentRepository.selectById(id)
    if (content) {
      const fullContentData = await this.fullContentFactory({ ...content, watched: true })
      await this.contentRepository.update(fullContentData)
      return fullContentData
    }
    return undefined
  }

  async insert(content: ContentDto): Promise<void> {
    const _content = await this.contentRepository.selectById(content.id)
    if (_content) throw new Error(EXCEPTIONS.ALREADY_EXISTS)

    this.contentRepository.insert(await this.fullContentFactory({ ...content, watched: false }))
  }

  async updateById(content: FullContent): Promise<void> {
    const fullContentData = await this.fullContentFactory({ ...content, watched: false })
    await this.contentRepository.update(fullContentData)
  }

  async deleteById(id: number): Promise<void> {
    await this.contentRepository.deleteById(id)
  }

  private async fullContentFactory(content: FullContent): Promise<FullContent> {
    return {
      ...content,
      expired: content.expires_at < +new Date(),
    }
  }
}
