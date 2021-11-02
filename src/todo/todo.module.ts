import { Module } from '@nestjs/common'
import { TodoService } from './services/todo.service'
import { TodoResolver } from './resolvers/todo.resolver'
import { PrismaService } from 'src/prisma/prisma.service'
import { BullModule } from '@nestjs/bull'

import { TODO_QUEUE } from 'src/constants'
import { TodoConsumer } from './consumer/todo.consumer'
import { TodoProducer } from './producer/todo.producer'

@Module({
    providers: [
        TodoResolver,
        TodoService,
        PrismaService,
        TodoConsumer,
        TodoProducer,
    ],
    imports: [BullModule.registerQueueAsync({ name: TODO_QUEUE })],
})
export class TodoModule {}
