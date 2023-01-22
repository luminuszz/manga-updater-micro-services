import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

(async () => {
  const logger = new Logger('Apllication context', { timestamp: true });

  const app = await NestFactory.create(AppModule);

  const configService = await app.get(ConfigService);

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'task-service-client',
        retry: {
          retries: 2,
        },

        brokers: [configService.get('KAFKA_CONECT_URL')],
      },

      consumer: {
        groupId: 'task-service-consumer',
      },
    },
  });

  const PORT = configService.get<number>('API_PORT');

  app.startAllMicroservices().then(() => logger.log('Microservices started'));
  app.listen(PORT).then(() => logger.log(`http is listening on port ${PORT}`));
})();
