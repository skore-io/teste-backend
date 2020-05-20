import { Injectable, Inject } from '@nestjs/common';
import { Repository } from './repository';

@Injectable()
export class RemoveContent {
  constructor(@Inject('Repository') private readonly repository: Repository) {}

  public run(id: number) {
    this.repository.remove(id);
  }
}
