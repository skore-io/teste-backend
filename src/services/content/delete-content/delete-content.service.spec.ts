import { Test, TestingModule } from '@nestjs/testing';
import { DeleteContentService } from './delete-content.service';

describe('DeleteContentService', () => {
  let service: DeleteContentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeleteContentService],
    }).compile();

    service = module.get<DeleteContentService>(DeleteContentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
