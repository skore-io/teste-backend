import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContentRepository } from './content.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ContentRepository])],
  exports: [],
  controllers: [],
  providers: [],
})
export class ContentsModule {}
