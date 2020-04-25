import { Test, TestingModule } from '@nestjs/testing';

import { ContentEntity } from './content.entity';

describe('ContentEntity', () => {
  let entity: ContentEntity;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [ContentEntity],
    }).compile();

    entity = app.get<ContentEntity>(ContentEntity);
  });

  it('should be defined', () => {
    expect(entity).toBeDefined();
  });

  describe('resetWatched method', () => {
    it('should set watched to false', () => {
      entity.watched = true;
      entity.resetWatched();

      expect(entity.watched).toBeFalsy();
    });
  });

  describe('calcExpiration method', () => {
    it('should set expired to true', () => {
      entity.expiresAt = new Date().getTime() - 3600 * 1000;
      entity.calcExpiration();

      expect(entity.expired).toBeTruthy();
    });

    it('should set expired to false', () => {
      entity.expiresAt = new Date().getTime() + 3600 * 1000;
      entity.calcExpiration();

      expect(entity.expired).toBeFalsy();
    });
  });
});
