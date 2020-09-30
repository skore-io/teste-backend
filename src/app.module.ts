import { Module } from '@nestjs/common';

import { ConteudoController } from './controllers/conteudo.controller';
import { ConteudoService } from './services/conteudo.service';

@Module({
  imports: [],
  controllers: [ConteudoController],
  providers: [ConteudoService],
})
export class AppModule {}
