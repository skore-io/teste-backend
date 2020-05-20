import { Content } from '../models/content';
import { Injectable } from '@nestjs/common';
import { Repository } from '../use-cases/repository';

@Injectable()
export class InMemoryRepository implements Repository {
  private db = {};

  public get(id: number) {
    return this.db[id];
  }

  public put(content: Content) {
    return (this.db[content.geId()] = content);
  }
}
