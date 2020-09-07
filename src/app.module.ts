import { Module } from '@nestjs/common'
import { VideoModule } from './video/video.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmConfig } from './config/typeorm.config'
import { VideoController } from './video/controllers/video.controller'
import { VideoModel } from './video/models/video.model'
import { VideoService } from './video/services/video.service'
import { VideoUniqueValidator } from './video/validators/video-unique.validator'

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    VideoModule,
    TypeOrmModule.forFeature([VideoModel]),
  ],
  controllers: [VideoController],
  providers: [VideoService, VideoUniqueValidator],
})
export class AppModule {}
