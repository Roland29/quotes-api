import { Min } from 'class-validator';
import { CreateQuoteInput } from '../../graphql.schema';

export class CreateQuoteDto extends CreateQuoteInput {
  @Min(1)
  age: number;
}
