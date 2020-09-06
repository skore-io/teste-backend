import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common'
import { ContentsService } from '../../Domain/Services/contents.service'
import { Contents } from '../../Domain/Models/ObjectLists/contents'
import { Content } from '../../Domain/Models/content'

@Controller('contents')
export class ContentsController {
  constructor(private readonly service: ContentsService) {}

  @Get()
  async findAll(): Promise<Contents> {
    return this.service.findAll()
  }

  @Post()
  async create(@Body('content') content: Content): Promise<Content> {
    return this.service.create(content)
  }

  @Get(':id')
  async find(@Param('id') contentId: number): Promise<Content> {
    try {
      return this.service.find(contentId)
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND)
    }
  }

  @Put()
  async update(@Body('content') content: Content): Promise<Content> {
    try {
      return this.service.update(content)
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND)
    }
  }
  @Delete()
  async delete(@Param('id') contentId: number): Promise<Content> {
    try {
      return this.service.delete(contentId)
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.NOT_FOUND)
    }
  }
}
