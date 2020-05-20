import { Test, TestingModule } from '@nestjs/testing';
import { ContentsController } from '../src/contents/controllers/contents.controller';
import { ContentInputData } from '../src/contents/controllers/input/ContentInputData';
import { CreateContent } from '../src/contents/use-cases/create-content'
import { Content } from '../src/contents/models/content';
import { BadRequestException } from '@nestjs/common';



describe('Contents Controller', () => {
  let controller: ContentsController;
  let createContent: CreateContent;

  const validContent = new ContentInputData(
    1,
    "GOTO 2017 • The Many Meanings of Event-Driven Architecture • Martin Fowler",
     3006,
    "youtube",
    "video",
    "STKCRSUsyP0",
    1580428851394,
  )
  const expectedReturn = new Content(
    1,
    "GOTO 2017 • The Many Meanings of Event-Driven Architecture • Martin Fowler",
     3006,
    "youtube",
    "video",
    "STKCRSUsyP0",
    1580428851394,
  )

  beforeEach(async () => {
    createContent = new CreateContent()
    controller = new ContentsController(createContent)
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create content', ()=> {
    describe('success', () => {
      it('returns the content', () =>{
        const createResult = {content: expectedReturn, isSuccess: true, errors: [] }
        jest.spyOn(createContent, 'run').mockImplementation(() => createResult);
        
        expect(controller.create(validContent)).toEqual(expectedReturn)
      })
    })

    describe('error', () => {
      it('trhows a bad request', () =>{
        const createResult = {content: expectedReturn, isSuccess: false, errors: ['An error'] }
        jest.spyOn(createContent, 'run').mockImplementation(() => createResult);
        try{
          controller.create(validContent)
        }catch(error){
          expect(error).toEqual(new BadRequestException(['An error']))
        }
      })
    })
  })
});
