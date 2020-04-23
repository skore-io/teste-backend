import { Test, TestingModule } from '@nestjs/testing';

import { ContentRepository } from './content.repository';
import { DtoContentCreate } from './dto/content-create.dto';
import { EnumProviders } from '../common/enums/providers.enum';
import { EnumMediaType } from '../common/enums/media-type.enum';

describe('ContentRepository', () => {
  let repository: ContentRepository;

  const dtoContentCreate: DtoContentCreate = {
    id: 1,
    name:
      'GOTO 2017 • The Many Meanings of Event-Driven Architecture • Martin Fowler',
    duration: 3006,
    provider: EnumProviders.youtube,
    mediaType: EnumMediaType.video,
    providerId: 'STKCRSUsyP0',
    expiresAt: 1580428851394,
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
    it('should call create with a content input then call save', () => {
      const save = jest.fn().mockResolvedValue({ test: true });
      repository.create = jest.fn().mockReturnValue({ save });

      repository.contentCreate(dtoContentCreate);

      expect(repository.create).toHaveBeenCalledTimes(1);
      expect(repository.create).toHaveBeenCalledWith(dtoContentCreate);
      expect(save).toHaveBeenCalledTimes(1);
    });
  });

  describe('read method', () => {
    it('should call findOne with the content id', () => {
      repository.findOne = jest.fn().mockResolvedValue({ test: true });
      repository.contentRead(123);

      expect(repository.findOne).toHaveBeenCalledTimes(1);
      expect(repository.findOne).toHaveBeenCalledWith(123);
    });
  });

  describe('update method', () => {
    it('should call update passing two parameters: id, data', () => {
      repository.update = jest.fn().mockResolvedValue({ test: true });
      const { id, ...updateData } = dtoContentCreate;

      repository.contentUpdate(dtoContentCreate);

      expect(repository.update).toHaveBeenCalledTimes(1);
      expect(repository.update).toHaveBeenCalledWith({ id }, updateData);
    });
  });

  describe('delete method', () => {
    it('should call delete with the content id', () => {
      repository.delete = jest.fn().mockResolvedValue({ test: true });
      repository.contentDelete(123);

      expect(repository.delete).toHaveBeenCalledTimes(1);
      expect(repository.delete).toHaveBeenCalledWith(123);
    });
  });
});
