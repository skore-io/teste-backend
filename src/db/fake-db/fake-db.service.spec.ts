import { Test, TestingModule } from '@nestjs/testing';
import { FakeDbService } from './fake-db.service';

describe('FakeDbService', () => {
  let service: FakeDbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FakeDbService],
    }).compile();

    service = module.get<FakeDbService>(FakeDbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
