"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const videos_service_1 = require("../services/videos.service");
const create_video_dto_1 = require("../dto/create-video.dto");
const update_video_dto_1 = require("../dto/update-video.dto");
const video_entity_1 = require("../serializers/video.entity");
const videoListing_entity_1 = require("../serializers/videoListing.entity");
let VideosController = class VideosController {
    constructor(videosService) {
        this.videosService = videosService;
    }
    create(data) {
        const video = this.videosService.create(data);
        return new video_entity_1.VideoEntity(video);
    }
    index() {
        const videos = this.videosService.findAll();
        return videos.map(video => {
            return new videoListing_entity_1.VideoListingEntity(video);
        });
    }
    show(params) {
        const video = this.videosService.findOne(params.id);
        this.videosService.assignWatched(video, true);
        return new video_entity_1.VideoEntity(video);
    }
    update(params, data) {
        const video = this.videosService.findOne(params.id);
        this.videosService.update(data, video);
        return new video_entity_1.VideoEntity(video);
    }
    delete(params) {
        const response = this.videosService.delete(params.id);
        return response;
    }
};
__decorate([
    common_1.Post(),
    common_1.UseInterceptors(common_1.ClassSerializerInterceptor),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_video_dto_1.CreateVideoDto]),
    __metadata("design:returntype", video_entity_1.VideoEntity)
], VideosController.prototype, "create", null);
__decorate([
    common_1.Get(),
    common_1.UseInterceptors(common_1.ClassSerializerInterceptor),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], VideosController.prototype, "index", null);
__decorate([
    common_1.Get(':id'),
    common_1.UseInterceptors(common_1.ClassSerializerInterceptor),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", video_entity_1.VideoEntity)
], VideosController.prototype, "show", null);
__decorate([
    common_1.Put(':id'),
    common_1.UseInterceptors(common_1.ClassSerializerInterceptor),
    __param(0, common_1.Param()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_video_dto_1.UpdateVideoDto]),
    __metadata("design:returntype", video_entity_1.VideoEntity)
], VideosController.prototype, "update", null);
__decorate([
    common_1.Delete(':id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], VideosController.prototype, "delete", null);
VideosController = __decorate([
    common_1.Controller('videos'),
    __metadata("design:paramtypes", [videos_service_1.VideosService])
], VideosController);
exports.VideosController = VideosController;
//# sourceMappingURL=videos.controller.js.map