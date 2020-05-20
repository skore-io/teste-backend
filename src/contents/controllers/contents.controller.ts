import { Controller, Body, BadRequestException, Post } from '@nestjs/common';
import { ContentInputData } from './input/ContentInputData';
import { CreateContent } from '../use-cases/create-content';

@Controller('contents')
export class ContentsController {
  constructor(private readonly createContent: CreateContent) {}

  @Post()
  create(@Body() contentInput) {
    const createResponse = this.createContent.run(this.forContent(contentInput));
    if (!createResponse.isSuccess)
      throw new BadRequestException(createResponse.errors);

    return createResponse.content;
  }
  
  forContent(contentInput): import("../models/content").Content {
      const input = this.convertInput(contentInput);
      if(this.isValidInput(input)) return input.getContent();
      
      throw new BadRequestException('Formato objeto invalido');
    }

  private isValidInput(input: ContentInputData){
    return input.isValid()
  }
  private convertInput(contentInput: any) {
    const input = new ContentInputData();
    input.id = contentInput.id;
    input.name = contentInput.name;
    input.duration = contentInput.duration;
    input.provider = contentInput.provider;
    input.media_type = contentInput.media_type;
    input.provider_id = contentInput.provider_id;
    input.expires_at = contentInput.expires_at;
    return input;
  }
}
