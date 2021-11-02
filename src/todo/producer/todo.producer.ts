import { InjectQueue } from '@nestjs/bull'
import { Queue } from 'bull'
import { NEW_TODO_QUEUE, TODO_QUEUE } from 'src/constants'
import { INewTodoEmailArgs } from '../types'

export class TodoProducer {
    constructor(@InjectQueue(TODO_QUEUE) private todoQueue: Queue) {}

    async email_new_todo(args: INewTodoEmailArgs) {
        await this.todoQueue.add(NEW_TODO_QUEUE, args)
    }
}
