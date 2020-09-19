import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const appPrefix = '/api'

  const options = new DocumentBuilder()
    .setTitle('Skore API')
    .setDescription('The Skore API description')
    .setVersion('1.0')
    .addTag('skore')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup(appPrefix + '/swagger', app, document)

  await app.listen(3000, () => console.log(`server running on localhost:3000${appPrefix}`))
}
bootstrap()
