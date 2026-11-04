import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.enableShutdownHooks();
  await app.listen(3001);
}

void bootstrap().catch((error: unknown) => {
  Logger.error(
    'RestAPI failed to start',
    error instanceof Error ? error.stack : String(error),
  );
  process.exitCode = 1;
});
