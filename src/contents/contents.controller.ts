import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
  Get,
  Param,
  Put,
  Delete,
  ParseIntPipe,
  ClassSerializerInterceptor,
} from '@nestjs/common';

import { ContentsService } from './contents.service';
import { DtoContentCreate } from './dto/content-create.dto';
import { DtoContentUpdate } from './dto/content-update.dto';
import {
  IContentCreated,
  IContentReaded,
  IContentUpdated,
  IContentDeleted,
} from './content.interfaces';
import { HttpLoggingInterceptor } from '../common/interceptors/http-logging.interceptor';
import { ContentSerializer } from './content.serializer';

@UseInterceptors(HttpLoggingInterceptor)
@UsePipes(new ValidationPipe({ transform: true, forbidNonWhitelisted: true }))
@Controller('contents')
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @Post()
  contentCreate(
    @Body() dtoContentCreate: DtoContentCreate,
  ): Promise<IContentCreated> {
    return this.contentsService.contentCreate(dtoContentCreate);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async contentRead(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<IContentReaded> {
    const content = await this.contentsService.contentRead({ id });
    return new ContentSerializer(content);
  }

  @Put(':id')
  contentUpdate(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() dtoContentUpdate: DtoContentUpdate,
  ): Promise<IContentUpdated> {
    return this.contentsService.contentUpdate({ id }, dtoContentUpdate);
  }

  @Delete(':id')
  contentDelete(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<IContentDeleted> {
    return this.contentsService.contentDelete({ id });
  }
}
