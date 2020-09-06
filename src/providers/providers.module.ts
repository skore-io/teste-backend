import { Module } from '@nestjs/common'
import { ProvidersService } from './Domain/Services/providers.service'
import { ProvidersController } from './Http/Controllers/providers.controller'

@Module({
  providers: [ProvidersService],
  controllers: [ProvidersController],
})
export class ProvidersModule {}
