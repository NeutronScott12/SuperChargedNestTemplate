import { Prisma } from '@prisma/client'
import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { UpdateTodoInput } from '../dto/update-todo.input'

@Injectable()
export class TodoService {
    constructor(private readonly prisma: PrismaService) {}

    create(args: Prisma.TodoCreateArgs) {
        return this.prisma.todo.create(args)
    }

    findAll(args: Prisma.TodoFindManyArgs) {
        return this.prisma.todo.findMany(args)
    }

    findOneById(args: Prisma.TodoFindUniqueArgs) {
        return this.prisma.todo.findUnique(args)
    }

    findFirst(args: Prisma.TodoFindUniqueArgs) {
        return this.prisma.todo.findFirst(args)
    }

    update(args: Prisma.TodoUpdateArgs) {
        return this.prisma.todo.update(args)
    }

    remove(args: Prisma.TodoDeleteArgs) {
        return this.prisma.todo.delete(args)
    }
}
