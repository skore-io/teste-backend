import { Test, TestingModule } from '@nestjs/testing';
import { VideosService } from './videos.service';
import { CreateVideoDto } from '../dto/create-video.dto';
import { HttpException } from '@nestjs/common';

describe('VideosService', () => {
  let service: VideosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VideosService],
    }).compile();

    service = module.get<VideosService>(VideosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe("creating a video", () => {
    it("must return a video object with a key watched equal to false", () => {      
      const videoParams: CreateVideoDto = {
        "id": 1,
        "name": "GOTO 2017 • The Many Meanings of Event-Driven Architecture • Martin Fowler",
        "duration": 3006,
        "provider": "youtube",
        "media_type": "video",
        "provider_id": "STKCRSUsyP0",
        "expires_at": 1580428851394
      }

      const expectedResult = {
        "id": 1,
        "name": "GOTO 2017 • The Many Meanings of Event-Driven Architecture • Martin Fowler",
        "duration": 3006,
        "provider": "youtube",
        "media_type": "video",
        "provider_id": "STKCRSUsyP0",
        "expires_at": 1580428851394,
        "watched": false,
      }

      const videoCreated = service.create(videoParams);

      expect(typeof (videoCreated)).toBe("object");
      expect(videoCreated).toEqual(expectedResult);
    });
  });

  describe("creating a video that already exists", () => {
    it("should return a error", () => {
      const videoParams: CreateVideoDto = {
        "id": 1,
        "name": "GOTO 2017 • The Many Meanings of Event-Driven Architecture • Martin Fowler",
        "duration": 3006,
        "provider": "youtube",
        "media_type": "video",
        "provider_id": "STKCRSUsyP0",
        "expires_at": 1580428851394
      }

      service.create(videoParams);
      
      expect(() => {
        service.create(videoParams);
      }).toThrow(HttpException);
    });
  });

  describe("get a list of videos", () => {
    it("must return a list of 2 videos", () => {
      const firstVideoParams: CreateVideoDto = {
        "id": 1,
        "name": "Batman",
        "duration": 3010,
        "provider": "youtube",
        "media_type": "video",
        "provider_id": "STKCRSUsyP0",
        "expires_at": 1580428851394
      }
    
      const secondVideoParams: CreateVideoDto = {
        "id": 2,
        "name": "Parafernalha",
        "duration": 4002,
        "provider": "youtube",
        "media_type": "video",
        "provider_id": "STKCRSUsyP0",
        "expires_at": 1580428851394
      }
      
      service.create(firstVideoParams);
      service.create(secondVideoParams);

      expect(service.findAll().length).toEqual(2);
    });
  });
});


