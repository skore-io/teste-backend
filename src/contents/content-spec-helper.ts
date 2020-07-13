import { CreateContentDTO } from './dto/create-content.dto'
import { Content } from './content.model'

export function newDummyContentDTO(id = 1): CreateContentDTO {
  const createContentDTO = new CreateContentDTO()
  createContentDTO.id = id
  createContentDTO.name =
    'GOTO 2017 • The Many Meanings of Event-Driven Architecture • Martin Fowler'
  createContentDTO.duration = 3006
  createContentDTO.provider = 'youtube'
  createContentDTO.media_type = 'video'
  createContentDTO.provider_id = 'STKCRSUsyP0'
  createContentDTO.expires_at = 1580428851394
  return createContentDTO
}

export function newDummyContent(id = 1): Content {
  const createContentDTO = newDummyContentDTO(id)
  return new Content(createContentDTO)
}
