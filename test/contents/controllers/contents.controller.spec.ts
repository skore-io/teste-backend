import { ContentsController } from '../../../src/contents/controllers/contents.controller';
import { CreateContent } from '../../../src/contents/use-cases/create-content';
import { Content } from '../../../src/contents/models/content';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { InMemoryRepository } from '../../../src/contents/repository/in-memory-repository';
import { GetContent } from '../../../src/contents/use-cases/get-content';

describe('Contents Controller', () => {
  let controller: ContentsController;
  let createContent: CreateContent;
  let getContent: GetContent;

  const repotitory = new InMemoryRepository();

  const validContent = {
    id: 1,
    name:
      'GOTO 2017 • The Many Meanings of Event-Driven Architecture • Martin Fowler',
    duration: 3006,
    provider: 'youtube',
    media_type: 'video',
    provider_id: 'STKCRSUsyP0',
    expires_at: 1580428851394,
  };

  const invalidContent = {
    id: 1,
    name:
      'GOTO 2017 • The Many Meanings of Event-Driven Architecture • Martin Fowler',
    duration: 3006,
    provider: 'youtube',
    media_type: 'video',
    provider_id: 'STKCRSUsyP0',
  };

  beforeEach(async () => {
    createContent = new CreateContent(repotitory);
    getContent = new GetContent(repotitory);
    controller = new ContentsController(createContent, getContent);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create content', () => {
    const expectedReturn = new Content(
      1,
      'GOTO 2017 • The Many Meanings of Event-Driven Architecture • Martin Fowler',
      3006,
      'youtube',
      'video',
      'STKCRSUsyP0',
      1580428851394,
    );
    describe('success', () => {
      it('returns the content', () => {
        const createResult = {
          content: expectedReturn,
          isSuccess: true,
          errors: [],
        };
        jest.spyOn(createContent, 'run').mockImplementation(() => createResult);

        expect(controller.create(validContent)).toEqual(expectedReturn);
      });
    });

    describe('cant create because of some use case rule', () => {
      it('throws a bad request', () => {
        try {
          controller.create(invalidContent);
        } catch (error) {
          expect(error).toEqual(
            new BadRequestException('Formato objeto invalido'),
          );
        }
      });
    });

    describe('incomplete input', () => {
      it('throws a bad request', () => {
        const createResult = {
          content: expectedReturn,
          isSuccess: false,
          errors: ['An error'],
        };
        jest.spyOn(createContent, 'run').mockImplementation(() => createResult);
        try {
          controller.create(validContent);
        } catch (error) {
          expect(error).toEqual(new BadRequestException(['An error']));
        }
      });
    });
  });

  describe('get content', () => {
    const expectedReturn = new Content(
      1,
      'GOTO 2017 • The Many Meanings of Event-Driven Architecture • Martin Fowler',
      3006,
      'youtube',
      'video',
      'STKCRSUsyP0',
      1580428851394,
    );
    describe('success', () => {
      it('returns the content', () => {
        const getResult = {
          content: expectedReturn,
          isSuccess: true,
          error: undefined,
        };
        jest.spyOn(getContent, 'run').mockImplementation(() => getResult);

        expect(controller.get(1)).toEqual(expectedReturn);
      });
    });

    describe('cant create because of some use case rule', () => {
      const getResult = {
        content: expectedReturn,
        isSuccess: false,
        error: '2 not found',
      };
      it('throws a bad request', () => {
        jest.spyOn(getContent, 'run').mockImplementation(() => getResult);
        try {
          controller.get(2);
        } catch (error) {
          expect(error).toEqual(new NotFoundException('2 not found'));
        }
      });
    });
  });
});
