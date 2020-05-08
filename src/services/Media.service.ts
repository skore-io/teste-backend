import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Media } from "../models/Media";
import { MediaRepository } from "../repository/Media.repository";
import { NotFoundError, BadRequestError } from "routing-controllers";
import * as moment from "moment";

@Service()
export class MediaService {

    @InjectRepository()
    private readonly mediaRepository: MediaRepository

    async createMedia(body: Media) {
        await this.mediaRepository.insert({
            ...body,
            expires_at: new Date(body.expires_at)
        }).catch(e => {
            if (e.code === "23505") throw new BadRequestError("Media already exists");
            throw e;
        });

        return {
            ...body,
            expired: false,
            watched: false
        };
    }

    async updateMedia(id: Media["id"], media: Media) {
        const updated = await this.mediaRepository.save({
            id,
            ...media,
            expires_at: new Date(media.expires_at),
            expired: false,
            watched: false
        });

        return {
            id,
            ...updated,
            expires_at: Number(new Date(media.expires_at))
        };
    }

    async getMediaById(id: Media["id"]) {
        const media = await this.mediaRepository.findOne(id);

        if (!media) throw new NotFoundError("Media not found");

        if (!media.expired && moment(new Date()).isAfter(media.expires_at)) {
            media.expired = true;
            await this.mediaRepository.expireMedia(id);
        }

        if (!media.watched) {
            await this.mediaRepository.setWatched(id);
        }

        return {
            ...media,
            expires_at: Number(new Date(media.expires_at))
        };
    }

    async deleteMedia(id: Media["id"]) {
        await this.mediaRepository.delete({ id });
    }
}
