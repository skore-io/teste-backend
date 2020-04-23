import {
  Repository,
  EntityRepository,
  UpdateResult,
  DeleteResult,
} from 'typeorm';

import { ContentEntity } from './content.entity';

@EntityRepository(ContentEntity)
export class ContentRepository extends Repository<ContentEntity> {
  contentCreate(content: Partial<ContentEntity>): Promise<ContentEntity> {
    return this.create(content).save();
  }

  contentRead(id: number): Promise<ContentEntity> {
    return this.findOne(id);
  }

  contentUpdate(content: Partial<ContentEntity>): Promise<UpdateResult> {
    const { id, ...updateData } = content;
    return this.update({ id }, updateData);
  }

  contentDelete(id: number): Promise<DeleteResult> {
    return this.delete(id);
  }
}
