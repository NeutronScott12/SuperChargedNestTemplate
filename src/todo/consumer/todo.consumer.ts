import { MailerService } from '@nestjs-modules/mailer'
import { Process, Processor } from '@nestjs/bull'
import { InternalServerErrorException } from '@nestjs/common'
import { Job } from 'bull'

import { NEW_TODO_QUEUE, TODO_QUEUE } from 'src/constants'
import { INewTodoEmailArgs } from '../types'

@Processor(TODO_QUEUE)
export class TodoConsumer {
    constructor(private readonly mailService: MailerService) {}

    @Process(NEW_TODO_QUEUE)
    async new_todo_email({ data: { todo, email } }: Job<INewTodoEmailArgs>) {
        try {
            await this.mailService.sendMail({
                to: email,
                from: 'todo.co.uk',
                subject: 'todo',
                text: `New Todo ${todo}`,
            })
        } catch (error) {
            throw new InternalServerErrorException({
                success: false,
                message: error.message,
            })
        }
    }
}
