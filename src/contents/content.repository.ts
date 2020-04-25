import {
  Repository,
  EntityRepository,
  DeleteResult,
  InsertResult,
  UpdateResult,
} from 'typeorm';

import { ContentEntity } from './content.entity';

@EntityRepository(ContentEntity)
export class ContentRepository extends Repository<ContentEntity> {
  contentCreate(content: Partial<ContentEntity>): Promise<InsertResult> {
    return this.insert(content);
  }

  contentRead({ id }: Partial<ContentEntity>): Promise<ContentEntity> {
    return this.findOne({ id });
  }

  async contentUpdate(
    { id }: Partial<ContentEntity>,
    {
      name,
      duration,
      provider,
      mediaType,
      providerId,
      expiresAt,
    }: Partial<ContentEntity>,
  ): Promise<{ affected: number }> {
    const content = await this.contentRead({ id });

    if (content) {
      content.name = name;
      content.duration = duration;
      content.provider = provider;
      content.mediaType = mediaType;
      content.providerId = providerId;
      content.expiresAt = expiresAt;

      await content.save();

      return { affected: 1 };
    }

    return { affected: 0 };
  }

  contentDelete({ id }: Partial<ContentEntity>): Promise<DeleteResult> {
    return this.delete(id);
  }

  contentSetWatched({ id }): Promise<UpdateResult> {
    return this.update({ id }, { watched: true });
  }
}
