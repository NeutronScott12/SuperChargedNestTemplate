import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { TodoService } from '../services/todo.service'
import { Todo } from '../entities/todo.entity'
import { CreateTodoInput } from '../dto/create-todo.input'
import { UpdateTodoInput } from '../dto/update-todo.input'
import { UseGuards } from '@nestjs/common'
import { GqlThrottleGuard } from 'src/decorators/GqlThrottleGuard'
import { GqlAuthGuard } from 'src/decorators/GqlAuthGuard'
import { TodoProducer } from '../producer/todo.producer'

@Resolver(() => Todo)
export class TodoResolver {
    constructor(
        private readonly todoService: TodoService,
        private readonly todoProducer: TodoProducer,
    ) {}

    @Mutation(() => Todo, { name: 'create_todo' })
    async createTodo(@Args('createTodoInput') { todo }: CreateTodoInput) {
        const newTodo = await this.todoService.create({
            data: {
                todo,
            },
        })

        this.todoProducer.email_new_todo({
            email: 'random@example.com',
            todo: newTodo.todo,
        })

        return newTodo
    }

    @UseGuards(GqlThrottleGuard)
    @Query(() => [Todo], { name: 'fetch_all_todos' })
    findAll() {
        return this.todoService.findAll({})
    }

    @Query(() => Todo, { name: 'find_one_todo' })
    findOne(@Args('id', { type: () => String }) id: string) {
        return this.todoService.findOneById({ where: { id } })
    }

    @UseGuards(GqlAuthGuard)
    @Mutation(() => Todo)
    update_todo(@Args('updateTodoInput') { id, todo }: UpdateTodoInput) {
        return this.todoService.update({ where: { id }, data: { todo } })
    }

    @Mutation(() => Todo)
    remove_todo(@Args('id', { type: () => String }) id: string) {
        return this.todoService.remove({ where: { id } })
    }
}
