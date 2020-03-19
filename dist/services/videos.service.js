"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
let VideosService = class VideosService {
    constructor() {
        this.videos = [];
    }
    create(video) {
        const index = this.getIndexVideo(video.id);
        if (this.validIndex(index)) {
            throw new common_2.HttpException('Duplicate video id!', 422);
        }
        video = this.assignWatched(video, false);
        this.videos.push(video);
        return video;
    }
    update(videoParams, video) {
        Object.assign(video, videoParams);
        this.assignWatched(video, false);
        return video;
    }
    findAll() {
        return this.videos;
    }
    findOne(videoId) {
        const video = this.videos.find(video => video.id === videoId);
        if (!video) {
            throw new common_2.HttpException('Not found video', 404);
        }
        return video;
    }
    delete(videoId) {
        const index = this.getIndexVideo(videoId);
        if (!this.validIndex(index)) {
            throw new common_2.HttpException('Not found video', 404);
        }
        this.videos.splice(1, index);
        return this.videos;
    }
    getIndexVideo(videoId) {
        return this.videos.findIndex(video => video.id === videoId);
    }
    validIndex(index) {
        return index >= 0;
    }
    assignWatched(video, wasWatched) {
        video["watched"] = wasWatched;
        return video;
    }
};
VideosService = __decorate([
    common_1.Injectable()
], VideosService);
exports.VideosService = VideosService;
//# sourceMappingURL=videos.service.js.map