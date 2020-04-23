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
});
