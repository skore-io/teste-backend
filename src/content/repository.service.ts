import { Injectable } from '@nestjs/common'
import { FullContent } from './content.service'

let contentArr: FullContent[] = []

@Injectable()
export class RepositoryService {
  async selectById(id: number) {
    return contentArr.filter(content => content.id === id)[0] || undefined
  }

  async insert(content: FullContent) {
    contentArr.push(content)
  }

  async update(content: FullContent) {
    contentArr = contentArr.filter(c => c.id !== content.id)
    contentArr.push(content)
  }

  async deleteById(id: number) {
    contentArr = contentArr.filter(c => c.id !== id)
  }
}
