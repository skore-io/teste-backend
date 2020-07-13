import { newDummyContent } from './content-spec-helper'
import { UpdateContentDTO } from './dto/update-content.dto'

describe('Content', () => {
  describe('markAsSeen', () => {
    it('sets `watched` to `true`', () => {
      const content = newDummyContent()
      expect(content.watched).toBe(false)
      content.markAsSeen()
      expect(content.watched).toBe(true)
    })
  })

  describe('markAsUnseen', () => {
    it('sets `watched` to `false`', () => {
      const content = newDummyContent()
      content.markAsSeen()
      expect(content.watched).toBe(true)

      content.markAsUnseen()
      expect(content.watched).toBe(false)
    })
  })

  describe('updateAttributes', () => {
    it('updates as properties present on DTO', () => {
      const content = newDummyContent()

      expect(content.name).not.toBe('new content name')
      expect(content.media_type).not.toBe('audio')

      const updateContentDTO = new UpdateContentDTO()
      updateContentDTO.name = 'new content name'
      updateContentDTO.media_type = 'audio'

      content.updateAttributes(updateContentDTO)

      expect(content.name).toBe('new content name')
      expect(content.media_type).toBe('audio')
    })
  })

  describe('expired', () => {
    it('is false before `expires_at`', () => {
      const content = newDummyContent()
      jest.spyOn(Date, 'now').mockImplementation(() => content.expires_at - 1)
      expect(content.expired).toBe(false)
    })

    it('is true at `expires_at`', () => {
      const content = newDummyContent()
      jest.spyOn(Date, 'now').mockImplementation(() => content.expires_at)
      expect(content.expired).toBe(true)
    })

    it('is true after `expires_at`', () => {
      const content = newDummyContent()
      jest.spyOn(Date, 'now').mockImplementation(() => content.expires_at + 1)
      expect(content.expired).toBe(true)
    })
  })
})
