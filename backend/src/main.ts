import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  app.use(cookieParser());
  app.enableCors({
    origin: process.env.CLIENT_URL || '*', // Fly.io no necesita esto si sirves el frontend
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
