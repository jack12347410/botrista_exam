import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  setUpSwagger(app);
  await app.listen(3000, () => {
    console.log(`server is running on ${3000}`);
  });
}

function setUpSwagger(app: INestApplication){
  const builder = new DocumentBuilder();
  const config = builder
    .setTitle('Botrista_exam')
    .setDescription('This is a basic Sqagger document.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const doc = SwaggerModule.createDocument(app, config);
  const options: SwaggerCustomOptions = {
    explorer: true, //開啟搜尋列
  }
  SwaggerModule.setup('swagger', app, doc, options);
}
bootstrap();
