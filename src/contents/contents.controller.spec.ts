import { ContentsController } from './contents.controller'
import { ContentsService } from './contents.service'
import { NotFoundException, BadRequestException } from '@nestjs/common'
import { newDummyContent, newDummyContentDTO } from './content-spec-helper'

describe('ContentsController', () => {
  let contentsController: ContentsController
  let contentsService: ContentsService

  beforeEach(() => {
    contentsService = new ContentsService()
    contentsController = new ContentsController(contentsService)
  })

  describe('findOne', () => {
    it('shoud return the content when id is present', () => {
      const searchID = 1
      const content = newDummyContent(searchID)
      jest.spyOn(contentsService, 'findOne').mockImplementation(() => content)

      expect(contentsController.findOne(searchID)).toBe(content)
    })

    it('raises NotFoundException when content is not found', () => {
      expect(contentsService.findAll).toHaveLength(0)
      expect(() => contentsController.findOne(1)).toThrowError(NotFoundException)
    })

    it('marks content as watched', () => {
      const contentDTO = newDummyContentDTO()
      expect(contentsController.create(contentDTO)).toHaveProperty('watched', false)
      expect(contentsController.findOne(contentDTO.id)).toHaveProperty('watched', true)
    })
  })

  describe('findAll', () => {
    it('should return an array of contents', () => {
      const result = [newDummyContent()]
      jest.spyOn(contentsService, 'findAll').mockImplementationOnce(() => result)

      expect(contentsController.findAll()).toBe(result)
    })
  })

  describe('create', () => {
    it('returns the created content', () => {
      const contentDTO = newDummyContentDTO(1)
      expect(contentsController.create(contentDTO)).toEqual({
        id: contentDTO.id,
        name: contentDTO.name,
        duration: contentDTO.duration,
        provider: contentDTO.provider,
        media_type: contentDTO.media_type,
        provider_id: contentDTO.provider_id,
        expires_at: contentDTO.expires_at,
        watched: contentDTO.watched,
      })
    })

    it('return throws bad request when id already present', () => {
      const contentDTO = newDummyContentDTO()
      contentsController.create(contentDTO)
      expect(() => contentsController.create(contentDTO)).toThrowError(BadRequestException)
    })

    it('persists', () => {
      const contentDTO = newDummyContentDTO()
      contentsController.create(contentDTO)
      expect(() => contentsController.findOne(contentDTO.id)).not.toThrowError(NotFoundException)
    })
  })

  describe('delete', () => {
    it('makes media unretrievable by id', () => {
      const contentDTO = newDummyContentDTO()
      contentsController.create(contentDTO)
      contentsController.delete(contentDTO.id)
      expect(() => contentsController.findOne(contentDTO.id)).toThrowError(NotFoundException)
    })

    it('removes from findAll', () => {
      const contentDTO = newDummyContentDTO()
      contentsController.create(contentDTO)
      expect(contentsController.findAll()).toHaveLength(1)

      contentsController.delete(contentDTO.id)
      expect(contentsController.findAll()).toHaveLength(0)
    })
  })
})
