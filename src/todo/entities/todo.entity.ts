import { ObjectType, Field, Int } from '@nestjs/graphql'

@ObjectType()
export class Todo {
    @Field(() => String, { description: 'ID Field for Todo' })
    id: string

    @Field()
    todo: string

    @Field(() => Date)
    created_at: Date

    @Field(() => Date)
    updated_at: Date
}
