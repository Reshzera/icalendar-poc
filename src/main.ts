import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(4000);
  console.log(`Application is running on port 4000`);
}

bootstrap();
