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

  describe("Create video", () => {
    it("should return a object video with watched false", () => {      
      const videoParams: CreateVideoDto = {
        "id": 1,
        "name": "GOTO 2017 • The Many Meanings of Event-Driven Architecture • Martin Fowler",
        "duration": 3006,
        "provider": "youtube",
        "media_type": "video",
        "provider_id": "STKCRSUsyP0",
        "expires_at": 1580428851394
      }

      const expectResult = {
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
      expect(videoCreated).toEqual(expectResult);
    });
  });

  describe("Create duplicated video", () => {
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
});


