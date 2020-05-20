import { Controller, Body, BadRequestException, Post } from '@nestjs/common';
import { ContentInputData } from './input/ContentInputData';
import { CreateContent } from '../use-cases/create-content';

@Controller('contents')
export class ContentsController {
  constructor(private readonly createContent: CreateContent){}

  @Post()
  create(@Body() contentInput: ContentInputData){
    const createResponse = this.createContent.run(contentInput.getContent())
    if(!createResponse.isSuccess) throw new BadRequestException(createResponse.errors);
    
    return createResponse.content
  }
}
