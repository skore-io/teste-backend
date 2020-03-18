"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
let VideosService = class VideosService {
    constructor() {
        this.videos = [];
    }
    create(video) {
        let video_id = { id: this.videos.length };
        Object.assign(video, video_id);
        this.videos.push(video);
        return video;
    }
    findAll() {
        return this.videos;
    }
};
VideosService = __decorate([
    common_1.Injectable()
], VideosService);
exports.VideosService = VideosService;
//# sourceMappingURL=videos.service.js.map