import { Controller, Get, Post, Body, Param, Delete, Put, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { VideosService } from '../services/videos.service';
import { CreateVideoDto } from '../dto/create-video.dto';
import { UpdateVideoDto } from '../dto/update-video.dto';
import { VideoEntity } from '../serializers/video.entity';
import { VideoListingEntity } from '../serializers/videoListing.entity';

@Controller('videos')
export class VideosController {

  constructor(private readonly videosService: VideosService) {}

  @Post()
  @UseInterceptors(ClassSerializerInterceptor)
  create(@Body() data: CreateVideoDto): VideoEntity {
    const video = this.videosService.create(data);
    return new VideoEntity(video);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  index(): Array<VideoListingEntity> {
    const videos = this.videosService.findAll();
    return videos.map( video => { 
      return new VideoListingEntity(video); 
    });
  }

  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  show(@Param() params): VideoEntity {
    console.log("parms", params["id"])
    const video = this.videosService.findOne(params["id"]);
    this.videosService.assignWatched(video, true);
    return new VideoEntity(video);
  }

  @Put(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  update(@Param() params, @Body() data: UpdateVideoDto): VideoEntity {
    const video = this.videosService.findOne(params.id);
    this.videosService.update(data, video);
    return new VideoEntity(video);
  }

  @Delete(':id')
  delete(@Param() params) {
    this.videosService.delete(params.id);    
  }
}

