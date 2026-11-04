import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
const logger = new Logger('Microservice');

async function bootstrap(): Promise<void> {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || 'amqp://localhost:5672'],
      queue: process.env.ITEMS_QUEUE || 'items_queue',
      queueOptions: {
        durable: false,
      },
    },
  });
  app.enableShutdownHooks();
  await app.listen();
}

void bootstrap().catch((error: unknown) => {
  logger.error(
    'Microservice failed to start',
    error instanceof Error ? error.stack : String(error),
  );
  process.exitCode = 1;
});
