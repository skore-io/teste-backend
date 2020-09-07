import { Repository } from 'typeorm'
import { VideoModel } from '../models/video.model'
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'

@Injectable()
export class VideoService {
  constructor(
    @InjectRepository(VideoModel)
    private readonly repository: Repository<VideoModel>,
  ) {}

  async getAllVideos(): Promise<VideoModel[]> {
    return await this.repository.find()
  }

  async findById(id: number): Promise<VideoModel> {
    const video = await this.repository.findOneOrFail(id)
    await this.repository.update({ id: video.id }, { watched: true })
    return video
  }

  async createVideo(videoDto: VideoModel): Promise<VideoModel> {
    const video = await this.repository.create(videoDto)
    return await this.repository.save(video)
  }

  async updateVideo(id: number, videoDto: VideoModel): Promise<VideoModel> {
    await this.repository.findOneOrFail(id)
    videoDto.watched = false
    await this.repository.update(id, videoDto)
    return await this.repository.findOneOrFail(id)
  }

  async destroyVideo(id: number): Promise<void> {
    await this.repository.findOneOrFail(id)
    await this.repository.delete(id)
  }
}
