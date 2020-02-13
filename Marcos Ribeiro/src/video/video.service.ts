import { Injectable, HttpException, HttpStatus } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { VideoDto } from '../dto/video.dto'
import { Video } from '../interfaces/video.interface'
import { SharedException } from '../shared/shared.exception'
import { SharedVideoService } from 'src/shared/sharedvideo.service'

@Injectable()
export class VideoService extends SharedVideoService<Video> {
    constructor(@InjectModel('Video') private readonly videoModel: Model<Video>) {
        super(videoModel)
    }

    async create(videoDTO: VideoDto): Promise<Video> {
        const { _id } = videoDTO
        let video = await this.videoModel.findById(_id)
        if (video) throw new SharedException('Duplicate key error!')

        const createdVideo = new this.videoModel(videoDTO)
        return createdVideo.save()
    }

    async findAll(): Promise<Video[]> {
        return this.videoModel.find().exec()
    }

    async update(_id: string, videoDTO: VideoDto): Promise<Video> {
        let video = await this.videoModel.findById(_id)
        if (!video) throw new SharedException('Video not Found')
        await video.updateOne(videoDTO)
        return this.videoWatched(video, false)
    }

    async delete(_id: string): Promise<any> {
        let video = await this.videoModel.findByIdAndDelete(_id)
        if (!video) throw new SharedException('Video not Found')
    }

}
