
import { InMemoryRepository } from '../../../src/contents/repository/in-memory-repository'
import { Content } from '../../../src/contents/models/content'

const repository = new InMemoryRepository()
describe('get', () => {
  it('returns null when not found', ()=> {
    expect(repository.get(1)).toBeUndefined()
  })

  it('returns the content when found', ()=> {
    const content = new Content(
      1,
      "GOTO 2017 • The Many Meanings of Event-Driven Architecture • Martin Fowler",
       3006,
      "youtube",
      "video",
      "STKCRSUsyP0",
      1580428851394,
    )
    repository.put(content)
    expect(repository.get(1)).toEqual(content)
  })
})