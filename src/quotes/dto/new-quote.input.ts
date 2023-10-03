import { Field, InputType } from '@nestjs/graphql';
import { Length, MaxLength } from 'class-validator';

@InputType()
export class NewQuoteInput {
  @Field()
  @MaxLength(30)
  author: string;

  @Field({ nullable: true })
  @Length(0, 255)
  content: string;
}
