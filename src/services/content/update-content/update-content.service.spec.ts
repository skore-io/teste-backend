import { Test, TestingModule } from '@nestjs/testing';
import { UpdateContentService } from './update-content.service';

describe('UpdateContentService', () => {
  let service: UpdateContentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UpdateContentService],
    }).compile();

    service = module.get<UpdateContentService>(UpdateContentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
