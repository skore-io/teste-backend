import { Content } from '../models/content';
import { Injectable, Inject } from '@nestjs/common';
import { Repository } from './repository';

@Injectable()
export class CreateContent {
  private errors = [];
  private content: Content;

  constructor(@Inject('Repository') private readonly repository: Repository) {}

  public run(content: Content) {
    this.content = content;
    this.call();
    return {
      content: this.content,
      isSuccess: !this.hasErrors(),
      errors: this.errors,
    };
  }

  private call() {
    this.validateContent();
    if (this.hasErrors()) return;

    this.repository.put(this.content);
  }

  private validateContent() {
    this.errors = [];
    if (this.repository.get(this.content.geId())) {
      this.errors.push(`${this.content.geId()} already added`);
    }
  }

  private hasErrors() {
    return this.errors.length > 0;
  }
}
