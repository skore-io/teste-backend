import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ContentsModule } from './contents/contents.module';
import { databaseConfig } from './config/database.config';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), ContentsModule],
  exports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
