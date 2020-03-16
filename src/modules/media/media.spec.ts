import { Test } from '@nestjs/testing';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { MediaRepository } from './media.repository';
import { Media } from './media.entitity';
import MediaExceptions from './media.exceptions';
import { MediaBO } from './media.bo';
import { InternalServerErrorException } from '@nestjs/common';

describe('Mídia - Criação: ', () => {
  let mediaController: MediaController;
  let mediaDAO: MediaRepository;

  beforeEach(async () => {
    const mediaModule = await Test.createTestingModule({
      controllers: [MediaController],
      providers: [MediaBO, MediaService, MediaRepository]
    }).compile();

    mediaController = mediaModule.get<MediaController>(MediaController);
    mediaDAO = mediaModule.get<MediaRepository>(MediaRepository);
  });

  it('Conteúdo de mídia gerado com SUCESSO.', () => {
    const newMedia = new Media({
      id: 1,
      name: "GOTO 2017 • The Many Meanings of Event-Driven Architecture • Martin Fowler",
      duration: 3006,
      provider: "youtube",
      media_type: "video",
      provider_id: "STKCRSUsyP0",
      expires_at: 1580428851394,
    })

    jest.spyOn(mediaDAO, 'create').mockImplementation(() => newMedia);
    jest.spyOn(mediaDAO, 'findById').mockImplementation(() => null);

    expect(mediaController.createMedia(newMedia)).toStrictEqual(newMedia);
  });

  it('EXCEÇÃO: Conteúdo de mídia existente.', () => {
    const newMedia = new Media({
      id: 1,
      name: "GOTO 2017 • The Many Meanings of Event-Driven Architecture • Martin Fowler",
      duration: 3006,
      provider: "youtube",
      media_type: "video",
      provider_id: "STKCRSUsyP0",
      expires_at: 1580428851394,
    })

    jest.spyOn(mediaDAO, 'findById').mockImplementation(() => newMedia);

    expect(() => mediaController.createMedia(newMedia)).toThrowError();
  });
});
