import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { readFileSync, existsSync } from 'fs';

async function bootstrap() {
  const keyPath = '/etc/letsencrypt/live/eckon.me/privkey.pem';
  const certPath = '/etc/letsencrypt/live/eckon.me/fullchain.pem';
  const hasFilesForTLS = existsSync(keyPath) && existsSync(certPath);
  console.log(`Has files for TLS: ${hasFilesForTLS}`);

  let initOptions = {};

  if (hasFilesForTLS) {
    const httpsOptions = {
      key: readFileSync(keyPath),
      cert: readFileSync(certPath),
    };
    initOptions = { httpsOptions };
  }

  const app = await NestFactory.create(AppModule, initOptions);
  app.enableCors();

  const options = new DocumentBuilder()
    .setTitle('phase10-backend')
    .setDescription('API Description for phase10')
    .setVersion('1.0.0')
    .setHost('localhost:3000')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();
