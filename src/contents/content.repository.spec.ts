import { Test, TestingModule } from '@nestjs/testing';

import { ContentRepository } from './content.repository';
import {
  IContentCreate,
  IContentUpdate,
  IContentId,
} from './content.interfaces';
import { EnumProviders } from '../common/enums/providers.enum';
import { EnumMediaType } from '../common/enums/media-type.enum';

describe('ContentRepository', () => {
  let repository: ContentRepository;

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
    const app: TestingModule = await Test.createTestingModule({
      providers: [ContentRepository],
    }).compile();

    repository = app.get<ContentRepository>(ContentRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('create method', () => {
    it('should call insert with a content input', () => {
      repository.insert = jest.fn();
      repository.contentCreate(contentCreate);

      expect(repository.insert).toHaveBeenCalledTimes(1);
      expect(repository.insert).toHaveBeenCalledWith(contentCreate);
    });
  });

  describe('read method', () => {
    it('should call findOne with the content id', () => {
      repository.findOne = jest.fn();
      repository.contentRead(contentId);

      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.findOne).toHaveBeenCalledWith(contentId);
    });
  });

  describe('update method', () => {
    it('should find the content then save it', async () => {
      const save = jest.fn();
      repository.contentRead = jest.fn().mockResolvedValue({ save });

      await repository.contentUpdate(contentId, contentUpdate);

      expect(repository.contentRead).toHaveBeenCalledTimes(1);
      expect(repository.contentRead).toHaveBeenCalledWith({ id: contentId.id });
      expect(save).toHaveBeenCalledTimes(1);
    });

    it('should not find the content then not save it', async () => {
      repository.contentRead = jest.fn().mockResolvedValue(null);
      const spy = jest.spyOn(repository, 'save');

      await repository.contentUpdate(contentId, contentUpdate);

      expect(repository.contentRead).toHaveBeenCalledTimes(1);
      expect(repository.contentRead).toHaveBeenCalledWith({ id: contentId.id });
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('delete method', () => {
    it('should call delete with the content id', () => {
      repository.delete = jest.fn();
      repository.contentDelete(contentId);

      expect(repository.delete).toHaveBeenCalledTimes(1);
      expect(repository.delete).toHaveBeenCalledWith(contentId.id);
    });
  });

  describe('setWatched method', () => {
    it('should call update with the content id and watched status', () => {
      repository.update = jest.fn();
      repository.contentSetWatched(contentId);

      expect(repository.update).toHaveBeenCalledTimes(1);
      expect(repository.update).toHaveBeenCalledWith(contentId, {
        watched: true,
      });
    });
  });
});
