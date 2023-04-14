import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'quote ' })
export class Quote {
  @Field((type) => ID)
  id: number;

  @Directive('@upper')
  author: string;

  @Field({ nullable: true })
  sentence: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
