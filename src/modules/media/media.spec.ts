import { Test } from '@nestjs/testing';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { MediaRepository } from './media.repository';
import { Media } from './media.entitity';
import { MediaBO } from './media.bo';
import { Utils } from '../../utils';

describe('Mídia - Criação: ', () => {
  let mediaController: MediaController;
  let mediaRepository: MediaRepository;
  let newMedia: Media;

  beforeEach(async () => {
    const mediaModule = await Test.createTestingModule({
      controllers: [MediaController],
      providers: [MediaBO, MediaService, MediaRepository, Utils]
    }).compile();

    mediaController = mediaModule.get<MediaController>(MediaController);
    mediaRepository = mediaModule.get<MediaRepository>(MediaRepository);

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
    jest.spyOn(mediaRepository, 'create').mockImplementation(() => newMedia);
    jest.spyOn(mediaRepository, 'findById').mockImplementation(() => null);

    expect(mediaController.createMedia(newMedia)).toStrictEqual(newMedia);
  });

  it('EXCEÇÃO: Conteúdo de mídia existente.', () => {
    jest.spyOn(mediaRepository, 'findById').mockImplementation(() => newMedia);

    expect(() => mediaController.createMedia(newMedia)).toThrowError();
  });
});

describe('Mídia - Detalhar: ', () => {
  let mediaController: MediaController;
  let mediaRepository: MediaRepository;
  let mediaMock: Media;
  let utils: Utils;

  beforeEach(async () => {
    const mediaModule = await Test.createTestingModule({
      controllers: [MediaController],
      providers: [MediaBO, MediaService, MediaRepository, Utils]
    }).compile();

    mediaController = mediaModule.get<MediaController>(MediaController);
    mediaRepository = mediaModule.get<MediaRepository>(MediaRepository);
    utils = mediaModule.get<Utils>(Utils);

    mediaMock = new Media({
      id: 1,
      name: "GOTO 2017 • The Many Meanings of Event-Driven Architecture • Martin Fowler",
      duration: 3006,
      provider: "youtube",
      media_type: "video",
      provider_id: "STKCRSUsyP0",
      expires_at: 1580428851394,
    })

    jest.spyOn(mediaRepository, 'findById').mockImplementation(() => mediaMock);
  });


  it('Detalha mídia com sucesso.', () => {
    const media = mediaController.getMedia(1);

    expect(media).toBeDefined();
    expect(media.expired).toBeDefined();
    expect(media.watched).toBeDefined();
  });

  it('Retorna mídia com propriedade expired VERDADEIRA (Timestamp da propriedade expires_at MENOR que a data atual).', () => {
    jest.spyOn(utils, 'getUTCTimestamp').mockImplementation(() => 1580428900000);

    const media = mediaController.getMedia(1);

    expect(media.expired).toStrictEqual(true);
  });

  it('Retorna mídia com propriedade expired FALSA (Timestamp da propriedade expires_at MAIOR que a data atual).', () => {
    jest.spyOn(utils, 'getUTCTimestamp').mockImplementation(() => 1580428800000);

    const media = mediaController.getMedia(1);

    expect(media.expired).toStrictEqual(false);
  });

  it('Retorna mídia com propriedade watched FALSA (Conteúdo ter sido obtido pela primeira vez).', () => {
    const media = mediaController.getMedia(1);

    expect(media.watched).toStrictEqual(false);
  });

  it('Retorna mídia com propriedade watched VERDADEIRA (Conteúdo já ter sido obtido alguma vez).', () => {
    let media: Media;

    media = mediaController.getMedia(1);
    expect(media.watched).toStrictEqual(false);

    media = mediaController.getMedia(1);
    expect(media.watched).toStrictEqual(true);
  });

  it('EXCEÇÃO: Mídia não encontrada.', () => {
    jest.spyOn(mediaRepository, 'findById').mockImplementation(() => null);

    expect(() => mediaController.getMedia(1)).toThrowError();
  });
});

describe('Mídia - Alteração: ', () => {
  let mediaController: MediaController;
  let mediaRepository: MediaRepository;
  let mediaMock: Media;
  let newMedia: Media;

  beforeEach(async () => {
    const mediaModule = await Test.createTestingModule({
      controllers: [MediaController],
      providers: [MediaBO, MediaService, MediaRepository, Utils]
    }).compile();

    mediaController = mediaModule.get<MediaController>(MediaController);
    mediaRepository = mediaModule.get<MediaRepository>(MediaRepository);

    mediaMock = new Media({
      id: 1,
      name: "GOTO 2017 • The Many Meanings of Event-Driven Architecture • Martin Fowler",
      duration: 3006,
      provider: "youtube",
      media_type: "video",
      provider_id: "STKCRSUsyP0",
      expires_at: 1580428851394,
    })

    newMedia = new Media({
      id: 1,
      name: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
      duration: 8000,
      provider: "vimeo"
    })

    jest.spyOn(mediaRepository, 'findById').mockImplementation(() => mediaMock);
  });


  it('Mídia alterada com sucesso.', () => {
    const updatedMedia = mediaController.updateMedia(newMedia);

    // Propriedades sobrescrevidas
    expect(updatedMedia.name).toStrictEqual(newMedia.name);
    expect(updatedMedia.duration).toStrictEqual(newMedia.duration);
    expect(updatedMedia.provider).toStrictEqual(newMedia.provider);

    // Propriedades mantidas
    expect(updatedMedia.media_type).toStrictEqual(mediaMock.media_type);
    expect(updatedMedia.provider_id).toStrictEqual(mediaMock.provider_id);
    expect(updatedMedia.expires_at).toStrictEqual(mediaMock.expires_at);
  });

  it('Propriedade watched após ser alterada DEVE ser falsa', () => {
    let media: Media;

    media = mediaController.getMedia(1);
    media = mediaController.getMedia(1);

    mediaController.updateMedia(newMedia);

    media = mediaController.getMedia(1);
    
    expect(media.watched).toStrictEqual(false);
  });
});
