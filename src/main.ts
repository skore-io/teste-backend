import * as dotenv from 'dotenv';
dotenv.config({});

import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';

import { AppModule } from './app.module';

import { serverConfig } from './config/server.config';

async function bootstrap() {
  const { env, port } = serverConfig;
  const logger = new Logger('Main');

  logger.debug(`Starting in ${env.toLocaleUpperCase()} mode`);

  const app = await NestFactory.create(AppModule);

  app.listen(port, () => {
    logger.debug(`Listening at port ${port}`);
  });
}
bootstrap();
