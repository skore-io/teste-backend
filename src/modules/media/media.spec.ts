import { Test } from '@nestjs/testing';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { MediaRepository } from './media.repository';
import { Media } from './media.entitity';
import { MediaBO } from './media.bo';
import { Utils } from '../../utils';

describe('Mídia - Criação: ', () => {
  let mediaController: MediaController;
  let mediaDAO: MediaRepository;
  let newMedia: Media;

  beforeEach(async () => {
    const mediaModule = await Test.createTestingModule({
      controllers: [MediaController],
      providers: [MediaBO, MediaService, MediaRepository]
    }).compile();

    mediaController = mediaModule.get<MediaController>(MediaController);
    mediaDAO = mediaModule.get<MediaRepository>(MediaRepository);

    newMedia = new Media({
      id: 1,
      name: "GOTO 2017 • The Many Meanings of Event-Driven Architecture • Martin Fowler",
      duration: 3006,
      provider: "youtube",
      media_type: "video",
      provider_id: "STKCRSUsyP0",
      expires_at: 1580428851394,
    })
  });

  it('Conteúdo de mídia gerado com SUCESSO.', () => {
    jest.spyOn(mediaDAO, 'create').mockImplementation(() => newMedia);
    jest.spyOn(mediaDAO, 'findById').mockImplementation(() => null);

    expect(mediaController.createMedia(newMedia)).toStrictEqual(newMedia);
  });

  it('EXCEÇÃO: Conteúdo de mídia existente.', () => {
    jest.spyOn(mediaDAO, 'findById').mockImplementation(() => newMedia);

    expect(() => mediaController.createMedia(newMedia)).toThrowError();
  });
});

describe('Mídia - Detalhar: ', () => {
  let mediaController: MediaController;
  let mediaDAO: MediaRepository;
  let mediaMock: Media;

  beforeEach(async () => {
    const mediaModule = await Test.createTestingModule({
      controllers: [MediaController],
      providers: [MediaBO, MediaService, MediaRepository, Utils]
    }).compile();

    mediaController = mediaModule.get<MediaController>(MediaController);
    mediaDAO = mediaModule.get<MediaRepository>(MediaRepository);

    mediaMock = new Media({
      id: 1,
      name: "GOTO 2017 • The Many Meanings of Event-Driven Architecture • Martin Fowler",
      duration: 3006,
      provider: "youtube",
      media_type: "video",
      provider_id: "STKCRSUsyP0",
      expires_at: 1580428851394,
    })

    jest.spyOn(mediaDAO, 'findById').mockImplementation(() => mediaMock);
  });


  it('Detalha mídia com sucesso.', () => {
    const media = mediaController.getMedia(1);

    expect(media).toStrictEqual(mediaMock);
    expect(media.expired).toBeDefined();
    expect(media.watched).toBeDefined();
  });

  it('Retorna mídia com propriedade expired VERDADEIRA (Timestamp da propriedade expires_at MAIOR que a data atual).', () => {
    const media = mediaController.getMedia(1);

    expect(media.expired).toStrictEqual(true);
  });

  it('Retorna mídia com propriedade expired FALSA (Timestamp da propriedade expires_at MENOR que a data atual).', () => {
    const media = mediaController.getMedia(1);

    expect(media.expired).toStrictEqual(false);
  });

  it('Retorna mídia com propriedade watched VERDADEIRA (Conteúdo já ter sido obtido alguma vez).', () => {
    const media = mediaController.getMedia(1);

    expect(media.watched).toStrictEqual(true);
  });

  it('Retorna mídia com propriedade watched FALSA (Conteúdo não ter sido obtido).', () => {
    const media = mediaController.getMedia(1);

    expect(media.watched).toStrictEqual(false);
  });

});
