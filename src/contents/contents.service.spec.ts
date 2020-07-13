import { ContentsService } from './contents.service'
import { newDummyContentDTO } from './content-spec-helper'
import { ContentNotFoundError } from './errors/content-not-found-error'
import { DuplicateIDError } from './errors/duplicate-id-error'
import { UpdateContentDTO } from './dto/update-content.dto'

describe('ContentsService', () => {
  let contentsService: ContentsService

  beforeEach(() => {
    contentsService = new ContentsService()
  })

  describe('findAll', () => {
    it('starts empty', () => {
      expect(new ContentsService().findAll()).toHaveLength(0)
    })

    it('returns all services', () => {
      const content = contentsService.create(newDummyContentDTO())
      expect(contentsService.findAll()).toEqual([content])
    })
  })

  describe('findOne', () => {
    it('returns the content', () => {
      const expected = contentsService.create(newDummyContentDTO())
      const received = contentsService.findOne(expected.id)
      expect(received).toEqual(expected)
    })

    it('marks content as seen', () => {
      const content = contentsService.create(newDummyContentDTO())
      expect(content.watched).toBe(false)

      contentsService.findOne(content.id)
      expect(content.watched).toBe(true)
    })

    describe('when id not present', () => {
      it('throws ContentNotFoundError', () => {
        expect(() => contentsService.findOne(1)).toThrowError(ContentNotFoundError)
      })
    })
  })

  describe('create', () => {
    it('persists to the service', () => {
      const content = contentsService.create(newDummyContentDTO())

      expect(() => contentsService.findOne(content.id)).not.toThrowError(ContentNotFoundError)

      expect(contentsService.findAll()).toEqual([content])
    })

    describe('when inserting a duplicate ID', () => {
      it('throws DuplicateIDError', () => {
        const contentDTO = newDummyContentDTO()
        contentsService.create(contentDTO)
        expect(() => contentsService.create(contentDTO)).toThrowError(DuplicateIDError)
      })
    })
  })

  describe('update', () => {
    it('updates content with attributes present on DTO', () => {
      const content = contentsService.create(newDummyContentDTO())

      const updateContentDTO = new UpdateContentDTO()
      updateContentDTO.name = 'new name'
      updateContentDTO.media_type = 'audio'

      contentsService.update(content.id, updateContentDTO)

      expect(content.name).toBe(updateContentDTO.name)
      expect(content.media_type).toBe(updateContentDTO.media_type)
    })

    it("doesn't change unspecified attributes", () => {
      const content = contentsService.create(newDummyContentDTO())
      const providerBeforeUpdate = content.provider

      const updateContentDTO = new UpdateContentDTO()
      updateContentDTO.name = 'new name'
      contentsService.update(content.id, updateContentDTO)

      const providerAfterUpdate = content.provider

      expect(providerAfterUpdate).toEqual(providerBeforeUpdate)
    })

    it('sets `watched` to false', () => {
      const content = contentsService.create(newDummyContentDTO())

      content.markAsSeen()
      expect(content.watched).toBe(true)

      const updateContentDTO = new UpdateContentDTO()
      updateContentDTO.name = 'new name'
      contentsService.update(content.id, updateContentDTO)

      expect(content.watched).toBe(false)
    })

    describe('when id not present', () => {
      it('throws ContentNotFoundError', () => {
        expect(() => contentsService.update(1, new UpdateContentDTO())).toThrowError(
          ContentNotFoundError,
        )
      })
    })
  })

  describe('delete', () => {
    it('removes from the service', () => {
      const content = contentsService.create(newDummyContentDTO())
      expect(contentsService.findAll()).toHaveLength(1)

      contentsService.delete(content.id)
      expect(contentsService.findAll()).toHaveLength(0)
      expect(() => contentsService.findOne(content.id)).toThrowError(ContentNotFoundError)
    })

    describe('when id not present', () => {
      it('throws ContentNotFoundError', () => {
        expect(() => contentsService.delete(1)).toThrowError(ContentNotFoundError)
      })
    })
  })

  describe('deleteAll', () => {
    it('empties service contents', () => {
      contentsService.create(newDummyContentDTO(1))
      contentsService.create(newDummyContentDTO(2))
      contentsService.create(newDummyContentDTO(3))

      expect(contentsService.findAll()).toHaveLength(3)
      contentsService.deleteAll()
      expect(contentsService.findAll()).toHaveLength(0)
    })
  })
})
