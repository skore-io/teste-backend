import { Model } from 'mongoose'
import { SharedException } from "./shared.exception"

export abstract class SharedVideoService<T> {

    constructor(public readonly model: Model<any>) {
    }

    async findById(id: string) {
        try {
            let video = await this.model.findById(id)
            if (!video) throw new SharedException('Register not Found.')

            return this.videoExpired(video, false)
        } catch (e) {
            throw new SharedException(e)
        }
    }

    async videoExpired(video, update?: boolean) {
        try {
            let objectExpireDate = video.expires_at.valueOf()
            let actualDate = Date.now().valueOf()
            if (objectExpireDate < actualDate) return await this.model
                .findByIdAndUpdate(
                    video.id,
                    { $set: { expired: true } },
                    { new: true }
                )

            return this.videoWatched(video, update)

        } catch (e) {
            throw new SharedException(e)
        }

    }

    async videoWatched(video, update?: boolean) {
        if (!update) {
            return await this.model
                .findByIdAndUpdate(
                    video.id,
                    { $set: { watched: true } },
                    { new: true }
                )
        }
        return await this.model
            .findByIdAndUpdate(
                video.id,
                { $set: { watched: false } },
                { new: true }
            )
    }

}