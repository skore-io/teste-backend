import { CreateContentDTO } from './dto/create-content.dto'
import { UpdateContentDTO } from './dto/update-content.dto'
import { Expose } from 'class-transformer'

export class Content {
  id: number
  name: string
  duration: number
  provider: string
  media_type: string
  provider_id: string
  expires_at: number
  watched: boolean

  constructor(createContentDTO: CreateContentDTO) {
    this.id = createContentDTO.id
    this.name = createContentDTO.name
    this.duration = createContentDTO.duration
    this.provider = createContentDTO.provider
    this.media_type = createContentDTO.media_type
    this.provider_id = createContentDTO.provider_id
    this.expires_at = createContentDTO.expires_at
    this.watched = createContentDTO.watched
  }

  updateAttributes(updateContentDTO: UpdateContentDTO): void {
    for (const [key, value] of Object.entries(updateContentDTO)) {
      this[key] = value
    }
  }

  markAsSeen(): void {
    this.watched = true
  }

  markAsUnseen(): void {
    this.watched = false
  }

  @Expose()
  get expired(): boolean {
    return Date.now() >= this.expires_at
  }
}
