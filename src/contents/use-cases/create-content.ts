import { Content } from '../models/content';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateContent {
  private repository;
  private errors = [];
  private content: Content;

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

    this.repository.save(this.content);
  }

  private validateContent() {
    if (this.repository.get(this.content.geId())) {
      this.errors.push(`${this.content.geId()} already added`);
    }
  }

  private hasErrors() {
    return this.errors.length > 0;
  }
}
