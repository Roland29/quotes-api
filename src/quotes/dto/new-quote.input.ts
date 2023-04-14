import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';

@InputType()
export class NewQuoteInput {
  @Field()
  @MaxLength(30)
  author: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(30, 255)
  sentence: string;
}
