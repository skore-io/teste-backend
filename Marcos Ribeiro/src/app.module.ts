import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VideoModule } from './video/video.module';

@Module({
  imports: [
    VideoModule,
    MongooseModule
    .forRoot('mongodb+srv://skore:skore2020@cluster0-8azph.mongodb.net/skore?retryWrites=true&w=majority', 
    { 
      useUnifiedTopology: true, 
      useNewUrlParser: true,
      useFindAndModify: false 
    })
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}