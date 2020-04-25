import { Test, TestingModule } from '@nestjs/testing';

import { ContentsController } from './contents.controller';
import { ContentsService } from './contents.service';
import {
  IContentCreate,
  IContentUpdate,
  IContentId,
} from './content.interfaces';
import { EnumProviders } from '../common/enums/providers.enum';
import { EnumMediaType } from '../common/enums/media-type.enum';
import { ContentSerializer } from './content.serializer';

describe('ContentsController', () => {
  let controller: ContentsController;
  let service = {
    contentCreate: jest.fn(),
    contentRead: jest.fn(),
    contentUpdate: jest.fn(),
    contentDelete: jest.fn(),
  };

  const contentCreate: IContentCreate = {
    id: 1,
    name:
      'GOTO 2017 • The Many Meanings of Event-Driven Architecture • Martin Fowler',
    duration: 3006,
    provider: EnumProviders.YouTube,
    mediaType: EnumMediaType.Video,
    providerId: 'STKCRSUsyP0',
    expiresAt: 1580428851394,
  };

  const contentUpdate: IContentUpdate = {
    name:
      'GOTO 2017 • The Many Meanings of Event-Driven Architecture • Martin Fowler',
    duration: 3006,
    provider: EnumProviders.YouTube,
    mediaType: EnumMediaType.Video,
    providerId: 'STKCRSUsyP0',
    expiresAt: 1580428851394,
  };

  const id = 123;
  const contentId: IContentId = { id };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ContentsService,
          useValue: service,
        },
      ],
      controllers: [ContentsController],
    }).compile();

    controller = module.get<ContentsController>(ContentsController);
    service = module.get(ContentsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create method', () => {
    it('should call service method passing the content data', () => {
      controller.contentCreate(contentCreate);

      expect(service.contentCreate).toHaveBeenCalledTimes(1);
      expect(service.contentCreate).toHaveBeenCalledWith(contentCreate);
    });
  });

  describe('read method', () => {
    it('should call service method passing the content id', () => {
      controller.contentRead(id);

      expect(service.contentRead).toHaveBeenCalledTimes(1);
      expect(service.contentRead).toHaveBeenCalledWith(contentId);
    });

    it('should return a instance of serializer', async () => {
      const result = await controller.contentRead(id);

      expect(result).toBeInstanceOf(ContentSerializer);
    });
  });

  describe('update method', () => {
    it('should call service method passing the content id and updateData', () => {
      controller.contentUpdate(id, contentUpdate);

      expect(service.contentUpdate).toHaveBeenCalledTimes(1);
      expect(service.contentUpdate).toHaveBeenCalledWith(
        contentId,
        contentUpdate,
      );
    });
  });

  describe('delete method', () => {
    it('should call service method passing the content id', () => {
      controller.contentDelete(id);

      expect(service.contentDelete).toHaveBeenCalledTimes(1);
      expect(service.contentDelete).toHaveBeenCalledWith(contentId);
    });
  });
});
