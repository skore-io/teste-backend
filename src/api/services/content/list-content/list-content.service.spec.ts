import { Test, TestingModule } from '@nestjs/testing';
import { ListContentService } from './list-content.service';

describe('ListContentService', () => {
  let service: ListContentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListContentService],
    }).compile();

    service = module.get<ListContentService>(ListContentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
