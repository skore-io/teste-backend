import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const validationPipe = new ValidationPipe({ transform: true })
  app.useGlobalPipes(validationPipe);

  await app.listen(3000);
}
bootstrap();
