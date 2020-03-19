import { VideosService } from '../services/videos.service';
import { Video } from '../interfaces/videos.interface';
import { CreateVideoDto } from '../dto/create-video.dto';
import { UpdateVideoDto } from '../dto/update-video.dto';
import { VideoEntity } from '../serializers/video.entity';
export declare class VideosController {
    private readonly videosService;
    constructor(videosService: VideosService);
    create(data: CreateVideoDto): VideoEntity;
    index(): Array<Video>;
    show(params: any): VideoEntity;
    update(params: any, data: UpdateVideoDto): VideoEntity;
    delete(params: any): Object;
}
