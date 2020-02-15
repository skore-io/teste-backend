import { Test, TestingModule } from '@nestjs/testing';
import { CreateContentService } from './create-content.service';

describe('CreateContentService', () => {
  let service: CreateContentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateContentService],
    }).compile();

    service = module.get<CreateContentService>(CreateContentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
