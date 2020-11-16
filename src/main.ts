import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { logLevel } from '@nestjs/microservices/external/kafka-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  const options = new DocumentBuilder()
    .setTitle('YDR notifications service')
    .setVersion('1.0')
    .addTag('notifications')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
        client: {
            clientId: 'users',
            brokers: ['localhost:9092'],
        },
        consumer: {
            groupId: 'users-consumer'
        },
        subscribe: {
            fromBeginning: true
        }
    }
  });
  await app.startAllMicroservicesAsync();

  await app.listen(process.env['APP_PORT']);
}
bootstrap();
