import { Module } from '@nestjs/common'
import { ContentsService } from './Domain/Services/contents.service'
import { ProvidersService } from '../providers/Domain/Services/providers.service'
import { ContentsController } from './Http/Controllers/contents.controller'

@Module({
  providers: [ContentsService, ProvidersService],
  controllers: [ContentsController],
})
export class ContentsModule {}
