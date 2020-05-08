import { EntityRepository, Repository } from "typeorm";
import { Media } from "../models/Media";
import { Service } from "typedi";

@Service()
@EntityRepository(Media)
export class MediaRepository extends Repository<Media> {

    expireMedia (id: Media["id"]) {
        return this.update({ id }, { expired: true });
    }

    setWatched (id: Media["id"]) {
        return this.update({ id }, { watched: true });
    }

}
