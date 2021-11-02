import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateTodoInput {
    @Field({ description: 'Add a todo' })
    todo: string
}
