import { Module } from '@nestjs/common'
import { VideoModule } from './video/video.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { typeOrmConfig } from './config/typeorm.config'

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), VideoModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
