import 'reflect-metadata';
import { Body, Controller, MessageEvent, Module, Post, Sse } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

class ChatRequest {
  message!: string;
}

@Controller('/api/chat')
class ChatController {
  @Post()
  chat(@Body() request: ChatRequest) {
    return {
      success: true,
      data: {
        answer: `nestjs-stub-answer: ${request.message}`,
        model: 'nestjs-demo',
      },
    };
  }

  @Sse('/stream')
  stream(@Body() request: ChatRequest): Observable<MessageEvent> {
    return from(['nestjs', 'stream', request.message]).pipe(
      map((chunk) => ({ data: chunk }) as MessageEvent),
    );
  }
}

@Module({
  controllers: [ChatController],
})
class AppModule {}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(8082);
}

bootstrap();
