import { JsonController, Get, Post, Body, Param, Delete, Put, HttpCode, OnUndefined} from "routing-controllers";
import { MediaService } from "../services/Media.service";
import { Media } from "../models/Media";

@JsonController()
export class MediaController {

    constructor(
        private readonly mediaService: MediaService,
    ) { }

    @Post()
    @HttpCode(201)
    create(@Body() media: Media) {
        return this.mediaService.createMedia(media);
    }

    @Get("/:id")
    getById(@Param("id") id: number) {
        return this.mediaService.getMediaById(id);
    }

    @Put("/:id")
    update(@Param("id") id: number, @Body() media: Media) {
        return this.mediaService.updateMedia(id, media);
    }

    @Delete("/:id")
    @OnUndefined(204)
    delete(@Param("id") id: number) {
        return this.mediaService.deleteMedia(id);
    }

}
