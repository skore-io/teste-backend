import { Inject } from '@nestjs/common';
import { Repository } from './repository';
import { Content } from '../models/content';

export class GetContent {
  private error;
  private content: Content;
  private id: number;

  constructor(@Inject('Repository') private readonly repository: Repository) {}

  public run(id: number) {
    this.id = id;
    this.call();
    return {
      content: this.content,
      isSuccess: !this.hasErrors(),
      error: this.error,
    };
  }

  private call() {
    this.content = this.repository.get(this.id);
    if (this.content) {
      this.error = undefined;
      this.setWatched();
      return;
    }

    this.error = `${this.id} not found`;
  }

  private setWatched() {
    this.content.setWatched();
    this.repository.put(this.content);
  }

  private hasErrors() {
    return this.error;
  }
}
