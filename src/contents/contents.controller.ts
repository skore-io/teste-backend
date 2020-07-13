import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  NotFoundException,
  Delete,
  Patch,
  BadRequestException,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common'
import { ContentsService } from './contents.service'
import { Content } from './content.model'
import { CreateContentDTO } from './dto/create-content.dto'
import { UpdateContentDTO } from './dto/update-content.dto'

@Controller('contents')
@UseInterceptors(ClassSerializerInterceptor)
export class ContentsController {
  constructor(private readonly contentsService: ContentsService) {}

  @Get()
  findAll(): Content[] {
    return this.contentsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') contentID: number): Content {
    try {
      return this.contentsService.findOne(Number(contentID))
    } catch (e) {
      throw new NotFoundException()
    }
  }

  @Post()
  create(@Body() createContentDTO: CreateContentDTO): Content {
    try {
      createContentDTO.watched = false
      return this.contentsService.create(createContentDTO)
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }

  @Patch(':id')
  update(@Param('id') contentID: number, @Body() updateContentDTO: UpdateContentDTO): Content {
    try {
      return this.contentsService.update(Number(contentID), updateContentDTO)
    } catch (e) {
      throw new NotFoundException()
    }
  }

  @Delete(':id')
  delete(@Param('id') contentID: number): Content {
    try {
      return this.contentsService.delete(Number(contentID))
    } catch (e) {
      throw new NotFoundException()
    }
  }
}
