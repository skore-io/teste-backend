import { Module } from '@nestjs/common'
import { ContentsModule } from './contents/contents.module'
import { ProvidersModule } from './providers/providers.module'

@Module({
  imports: [ProvidersModule, ContentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
