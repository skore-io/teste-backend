import { Test, TestingModule } from '@nestjs/testing';

import { ContentsService } from './contents.service';
import { ContentRepository } from './content.repository';
import {
  IContentCreate,
  IContentUpdate,
  IContentId,
} from './content.interfaces';
import { EnumProviders } from '../common/enums/providers.enum';
import { EnumMediaType } from '../common/enums/media-type.enum';
import {
  UnprocessableEntityException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

describe('ContentsService', () => {
  let service: ContentsService;
  let repository = {
    contentCreate: jest.fn(),
    contentRead: jest.fn(),
    contentUpdate: jest.fn(),
    contentDelete: jest.fn(),
    contentSetWatched: jest.fn(),
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

  const contentId: IContentId = {
    id: 123,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContentsService,
        {
          provide: ContentRepository,
          useValue: repository,
        },
      ],
    }).compile();

    service = module.get<ContentsService>(ContentsService);
    repository = module.get(ContentRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('create method', () => {
    it('call repository create method with content data', () => {
      service.contentCreate(contentCreate);

      expect(repository.contentCreate).toHaveBeenCalledTimes(1);
      expect(repository.contentCreate).toHaveBeenCalledWith(contentCreate);
    });

    it('should throw due to duplicate id key', () => {
      repository.contentCreate = jest.fn().mockRejectedValue({ code: '23505' });

      expect(service.contentCreate(contentCreate)).rejects.toThrowError(
        UnprocessableEntityException,
      );
    });

    it('should throw due to internal error', () => {
      repository.contentCreate = jest.fn().mockRejectedValue({});

      expect(service.contentCreate(contentCreate)).rejects.toThrowError(
        InternalServerErrorException,
      );
    });
  });

  describe('read method', () => {
    it('should call repository read method with content id', () => {
      repository.contentRead = jest.fn().mockResolvedValue({ watched: true });
      service.contentRead(contentId);

      expect(repository.contentRead).toHaveBeenCalledTimes(1);
      expect(repository.contentRead).toHaveBeenCalledWith(contentId);
    });

    it('should set the content as watched', async () => {
      repository.contentRead = jest.fn().mockResolvedValue({ watched: false });
      await service.contentRead(contentId);

      expect(repository.contentSetWatched).toHaveBeenCalledTimes(1);
      expect(repository.contentSetWatched).toHaveBeenCalledWith(contentId);
    });

    it('should throw due to not find any content with the given id', () => {
      repository.contentRead = jest.fn().mockResolvedValue(null);

      expect(service.contentRead(contentId)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('update method', () => {
    it('call repository update method with content id and updateData', () => {
      repository.contentUpdate = jest
        .fn()
        .mockImplementation(() => ({ affected: 1 }));

      service.contentUpdate(contentId, contentUpdate);

      expect(repository.contentUpdate).toHaveBeenCalledTimes(1);
      expect(repository.contentUpdate).toHaveBeenCalledWith(
        contentId,
        contentUpdate,
      );
    });

    it('should throw due to not find any content with the given id', () => {
      repository.contentUpdate = jest
        .fn()
        .mockImplementation(() => ({ affected: 0 }));

      expect(
        service.contentUpdate(contentId, contentUpdate),
      ).rejects.toThrowError(NotFoundException);
    });
  });

  describe('delete method', () => {
    it('call repository delete method with content id', () => {
      repository.contentDelete = jest
        .fn()
        .mockImplementation(() => ({ affected: 1 }));

      service.contentDelete(contentId);

      expect(repository.contentDelete).toHaveBeenCalledTimes(1);
      expect(repository.contentDelete).toHaveBeenCalledWith(contentId);
    });

    it('should throw due to not find any content with the given id', () => {
      repository.contentDelete = jest
        .fn()
        .mockImplementation(() => ({ affected: 0 }));

      expect(service.contentDelete(contentId)).rejects.toThrowError(
        NotFoundException,
      );
    });
  });
});
