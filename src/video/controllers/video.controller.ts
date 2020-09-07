import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common'
import { VideoService } from '../services/video.service'
import { VideoModel } from '../models/video.model'
import { CreateVideoDto } from '../dto/create-video.dto'
import { UpdateVideoDto } from '../dto/update-video.dto'

@Controller('videos')
export class VideoController {
  constructor(private readonly service: VideoService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async index(): Promise<VideoModel[]> {
    return this.service.getAllVideos()
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  async show(@Param('id', ParseIntPipe) id: number): Promise<VideoModel> {
    return this.service.findById(id)
  }

  @Post()
  async store(@Body(new ValidationPipe()) request: CreateVideoDto): Promise<VideoModel> {
    return this.service.createVideo(request)
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body(new ValidationPipe()) request: UpdateVideoDto,
  ): Promise<VideoModel> {
    return this.service.updateVideo(id, request)
  }

  @Delete(':id')
  @HttpCode(204)
  async destroy(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.service.destroyVideo(id)
  }
}
