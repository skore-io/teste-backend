import { Video } from '../interfaces/videos.interface';
export declare class VideosService {
    private videos;
    create(video: Video): Video;
    update(videoParams: Video, video: Video): Video;
    findAll(): Array<Video>;
    findOne(videoId: any): Video;
    delete(videoId: any): Object;
    private getIndexVideo;
    private validIndex;
    assignWatched(video: any, wasWatched: any): any;
}
