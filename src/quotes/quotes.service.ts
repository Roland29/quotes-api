import { Injectable } from '@nestjs/common';
import { Quote } from '../graphql.schema';

@Injectable()
export class QuotesService {
  private readonly quotes: Array<Quote> = [{ id: 1, name: 'Cat', age: 5 }];

  create(quote: Quote): Quote {
    quote.id = this.quotes.length + 1;
    this.quotes.push(quote);
    return quote;
  }

  findAll(): Quote[] {
    return this.quotes;
  }

  findOneById(id: number): Quote {
    return this.quotes.find((quote) => quote.id === id);
  }
}
