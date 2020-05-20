import { Content } from '../models/content';
import { Injectable, Inject } from '@nestjs/common';
import { Repository } from './repository';

@Injectable()
export class UpdateContent {
  private error;
  private content: Content;

  constructor(@Inject('Repository') private readonly repository: Repository) {}

  public run(content: Content) {
    this.content = content;
    this.call();
    return {
      content: this.content,
      isSuccess: !this.hasErrors(),
      error: this.error,
    };
  }

  private call() {
    this.validateContent();
    if (this.hasErrors()) return;

    this.repository.put(this.content);
  }

  private validateContent() {
    this.error = undefined;
    if (!this.repository.get(this.content.geId())) {
      this.error = `${this.content.geId()} not found`
    }
  }

  private hasErrors() {
    return !this.error;
  }
}
