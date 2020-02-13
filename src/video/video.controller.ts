import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common'
import { VideoDto } from '../dto/video.dto'
import { VideoService } from './video.service'
import { Video } from '../interfaces/video.interface'
import { ApiCreatedResponse, ApiBadRequestResponse, ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger'

@Controller('video')
export class VideoController {
    constructor(private readonly videoService: VideoService) { }

    @Post()
    async create(@Body() videoDTO: VideoDto): Promise<Video> {
        return this.videoService.create(videoDTO)
    }

    @Get('list')
    async findAll(): Promise<Video[]> {
        return this.videoService.findAll()
    }

    @Get(':id')
    async findById(@Param() params) {
        return this.videoService.findById(params.id)
    }

    @Put(':id')
    async update(@Param() params, @Body() videoDTO: VideoDto) {
        return await this.videoService.update(params.id, videoDTO)
    }

    @Delete(':id')
    async remove(@Param() params) {
        return await this.videoService.delete(params.id)
    }
}
