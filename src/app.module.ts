import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { VideosController } from './videos/videos.controller';
import { VideosService } from './services/videos.service';

@Module({
  imports: [],
  controllers: [AppController, VideosController],
  providers: [VideosService],
})

export class AppModule {}
