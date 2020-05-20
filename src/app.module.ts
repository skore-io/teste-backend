import { Module } from '@nestjs/common';
import { ContentsModule } from './contents/contents.module';

@Module({
  imports: [ContentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
