import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContentsModule } from './contents/contents.module';
import { databaseConfig } from './config/database.config';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), ContentsModule],
  exports: [],
  controllers: [],
  providers: [],
})
export class AppModule {}
