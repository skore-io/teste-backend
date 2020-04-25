import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ContentRepository } from './content.repository';
import {
  IContentCreate,
  IContentCreated,
  IContentRead,
  IContentReaded,
  IContentUpdate,
  IContentUpdated,
  IContentDelete,
  IContentDeleted,
  IContentId,
} from './content.interfaces';

@Injectable()
export class ContentsService {
  constructor(
    @InjectRepository(ContentRepository)
    private readonly contentRepository: ContentRepository,
  ) {}

  async contentCreate(content: IContentCreate): Promise<IContentCreated> {
    try {
      const createResult = await this.contentRepository.contentCreate(content);
      return { id: content.id, isCreated: !!createResult };
    } catch (error) {
      if (error.code === '23505') {
        throw new UnprocessableEntityException(
          `A content with this id already exists.`,
        );
      }

      throw new InternalServerErrorException();
    }
  }

  async contentRead(content: IContentRead): Promise<IContentReaded> {
    const readResult = await this.contentRepository.contentRead(content);

    if (readResult) {
      if (!readResult.watched) {
        await this.contentRepository.contentSetWatched({ id: content.id });
      }

      return readResult;
    } else {
      throw new NotFoundException();
    }
  }

  async contentUpdate(
    contentId: IContentId,
    updateData: IContentUpdate,
  ): Promise<IContentUpdated> {
    const result = await this.contentRepository.contentUpdate(
      contentId,
      updateData,
    );

    const isUpdated = result.affected > 0;

    if (isUpdated) {
      return { id: contentId.id, isUpdated };
    } else {
      throw new NotFoundException();
    }
  }

  async contentDelete(content: IContentDelete): Promise<IContentDeleted> {
    const result = await this.contentRepository.contentDelete(content);
    const isDeleted = result.affected > 0;

    if (isDeleted) {
      return { id: content.id, isDeleted };
    } else {
      throw new NotFoundException();
    }
  }
}
