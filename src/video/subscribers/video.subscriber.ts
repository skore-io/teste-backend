import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm'
import { VideoModel } from '../models/video.model'

@EventSubscriber()
export class VideoSubscriber implements EntitySubscriberInterface<VideoModel> {
  listenTo() {
    return VideoModel
  }

  beforeInsert(event: InsertEvent<VideoModel>) {
    event.entity.watched = false
  }
}
