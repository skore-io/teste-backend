import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ForbiddenException,
  HttpStatus,
  HttpException,
  Inject,
} from '@nestjs/common'
import { ContentDto } from './content.dto'
import { ContentService, EXCEPTIONS } from './content.service'

@Controller('content')
export class ContentController {
  @Inject()
  private readonly contentService: ContentService

  @Get(':id')
  async findById(@Param('id') id: number) {
    const content = await this.contentService.getById(Number(id))
    if (!content) {
      throw new HttpException('', HttpStatus.NO_CONTENT)
    }
    return content
  }

  @Post()
  async post(@Body() content: ContentDto) {
    try {
      return await this.contentService.insert(content)
    } catch (error) {
      if (error.message === EXCEPTIONS.ALREADY_EXISTS) {
        throw new ForbiddenException()
      }
      throw error
    }
  }

  @Put()
  async update(@Body() content: ContentDto) {
    return await this.contentService.updateById(content)
  }

  @Delete(':id')
  async deleteById(@Param('id') id: number) {
    return await this.contentService.deleteById(Number(id))
  }
}
