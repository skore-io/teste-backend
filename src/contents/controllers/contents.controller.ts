import {
  Controller,
  Body,
  BadRequestException,
  Post,
  Get,
  Param,
  NotFoundException,
  Put,
} from '@nestjs/common';
import { ContentInputData } from './input/ContentInputData';
import { CreateContent } from '../use-cases/create-content';
import { GetContent } from '../use-cases/get-content';
import { UpdateContent } from '../use-cases/update-content';

@Controller('contents')
export class ContentsController {
  constructor(
    private readonly createContent: CreateContent,
    private readonly getContent: GetContent,
    private readonly updateContent: UpdateContent,
  ) {}

  @Get(':id')
  get(@Param('id') id: number) {
    const getResponse = this.getContent.run(id);
    if (!getResponse.isSuccess) throw new NotFoundException(getResponse.error);

    return getResponse.content;
  }

  @Post()
  create(@Body() contentInput) {
    const createResponse = this.createContent.run(
      this.forContent(contentInput),
    );
    if (!createResponse.isSuccess)
      throw new BadRequestException(createResponse.errors);

    return createResponse.content;
  }

  @Put(':id')
  put(@Param('id') id: number, @Body() contentInput) {
    contentInput.id = id;
    const getResponse = this.updateContent.run(this.forContent(contentInput));
    if (!getResponse.isSuccess) throw new NotFoundException(getResponse.error);

    return getResponse.content;
  }

  private forContent(contentInput): import('../models/content').Content {
    const input = this.convertInput(contentInput);
    if (this.isValidInput(input)) return input.getContent();

    throw new BadRequestException('Formato objeto invalido');
  }

  private isValidInput(input: ContentInputData) {
    return input.isValid();
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
