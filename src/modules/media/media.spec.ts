import { Test } from '@nestjs/testing';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { MediaRepository } from './media.repository';
import { Media } from './media.entitity';
import MediaExceptions from './media.exceptions';

describe('Mídia - Criação: ', () => {
  let mediaController: MediaController;
  let mediaDAO: MediaRepository;

  beforeEach(async () => {
    const mediaModule = await Test.createTestingModule({
      controllers: [MediaController],
      providers: [MediaService, MediaRepository]
    }).compile();

    mediaController = mediaModule.get<MediaController>(MediaController);
    mediaDAO = mediaModule.get<MediaRepository>(MediaRepository);
  });

  it('Conteúdo de mídia gerado com SUCESSO.', async () => {
    const newMedia = new Media({
      id: 1,
      name: "GOTO 2017 • The Many Meanings of Event-Driven Architecture • Martin Fowler",
      duration: 3006,
      provider: "youtube",
      media_type: "video",
      provider_id: "STKCRSUsyP0",
      expires_at: 1580428851394,
    })

    jest.spyOn(mediaDAO, 'findById').mockImplementation(async () => null);

    await expect(mediaController.createMedia(newMedia)).resolves.toBe(newMedia);
  });

  it('EXCEÇÃO: Conteúdo de mídia existente.', async () => {
    const newMedia = new Media({
      id: 1,
      name: "GOTO 2017 • The Many Meanings of Event-Driven Architecture • Martin Fowler",
      duration: 3006,
      provider: "youtube",
      media_type: "video",
      provider_id: "STKCRSUsyP0",
      expires_at: 1580428851394,
    })

    jest.spyOn(mediaDAO, 'findById').mockImplementation(async () => newMedia);

    await expect(mediaController.createMedia(newMedia)).rejects.toThrow(MediaExceptions.EXISTINT_MEDIA);
  });
});
