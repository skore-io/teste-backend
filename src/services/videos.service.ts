import { Injectable } from '@nestjs/common';
import { Video } from '../interfaces/videos.interface';
import { HttpException } from '@nestjs/common';

@Injectable()
export class VideosService {
  private videos: Array<Video> = [];

  create(video: Video): Video {
    const index = this.getIndexVideo(video.id);
    
    if (this.validIndex(index)) {
      throw new HttpException('Duplicate video id!', 422);
    }

    video = this.assignWatched(video, false);

    this.videos.push(video);
    return video;
  }

  update(videoParams: Video, video: Video): Video {
    Object.assign(video, videoParams);
    this.assignWatched(video, false);
   
    return video;
  }

  findAll(): Array<Video> {
    return this.videos;
  }

  findOne(videoId): Video {
    const video = this.videos.find(video => video.id === videoId);
    
    if (!video) {
      throw new HttpException('Not found video', 404);
    }
    return video;
  } 

  delete(videoId): Object {
    const index = this.getIndexVideo(videoId);
    
    if (!this.validIndex(index)) {
      throw new HttpException('Not found video', 404);
    } 

    this.videos.splice(1, index);
    return this.videos;
  } 

  private getIndexVideo(videoId) {
    return this.videos.findIndex(video => video.id === videoId);
  }

  private validIndex(index) : Boolean {
    return index >= 0;
  }

  assignWatched(video, wasWatched) {
    video["watched"] = wasWatched;
    return video;
  }

}
