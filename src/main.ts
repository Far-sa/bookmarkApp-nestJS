import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap () {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(3333)
}
bootstrap()

//TODO
// app.useGlobalPipes(
//   new ValidationPipe({
//     whitelist: true,
//     transform: true,
//     forbidNonWhitelisted: true,
//   }),
// )
