import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { VideoSubscriber } from '../video/subscribers/video.subscriber'
import { VideoModel } from '../video/models/video.model'

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'db',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'nest',
  entities: [VideoModel],
  subscribers: [VideoSubscriber],
}
