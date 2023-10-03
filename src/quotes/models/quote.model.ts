import { Directive, Field, ObjectType } from '@nestjs/graphql';

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type QuoteDocument = HydratedDocument<Quote>;

@Schema({ timestamps: true })
@ObjectType({ description: 'quote ' })
export class Quote {
  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId;

  @Prop()
  @Directive('@upper')
  @Field()
  author: string;

  @Prop()
  @Field({ nullable: true })
  content: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export const QuoteSchema = SchemaFactory.createForClass(Quote);
