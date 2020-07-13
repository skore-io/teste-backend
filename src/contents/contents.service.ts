import { Injectable } from '@nestjs/common'
import { Content } from './content.model'
import { CreateContentDTO } from './dto/create-content.dto'
import { ContentNotFoundError } from './errors/content-not-found-error'
import { UpdateContentDTO } from './dto/update-content.dto'
import { DuplicateIDError } from './errors/duplicate-id-error'

@Injectable()
export class ContentsService {
  private contents: Content[] = []

  findAll(): Content[] {
    return this.contents
  }

  findOne(id: number): Content {
    const content = this.findById(id)
    content.markAsSeen()
    return content
  }

  create(createContentDTO: CreateContentDTO): Content {
    if (this.isIDPresent(createContentDTO.id)) throw new DuplicateIDError()

    const newContent = new Content(createContentDTO)
    this.contents.push(newContent)
    return newContent
  }

  update(id: number, updateContentDTO: UpdateContentDTO): Content {
    const content = this.findById(id)
    content.updateAttributes(updateContentDTO)
    content.markAsUnseen()
    return content
  }

  delete(id: number): Content {
    const content = this.findById(id)
    const contentIndex = this.contents.indexOf(content)

    this.contents.splice(contentIndex, 1)

    return content
  }

  deleteAll(): void {
    this.contents = []
  }

  findById(id: number): Content {
    const content = this.contents.find(content => content.id === id)
    if (!content) throw new ContentNotFoundError()

    return content
  }

  private isIDPresent(id: number): boolean {
    return this.contents.some(content => content.id === id)
  }
}
