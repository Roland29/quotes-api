import { Injectable } from '@nestjs/common';
import { NewQuoteInput } from './dto/new-quote.input';
import { QuotesArgs } from './dto/quotes.args';
import { Quote } from './models/quote.model';

@Injectable()
export class QuotesService {
  async create(data: NewQuoteInput): Promise<Quote> {
    return {} as Quote;
  }

  async findAll(quotesArgs: QuotesArgs): Promise<Quote[]> {
    return [] as Quote[];
  }

  async findOneById(id: number): Promise<Quote> {
    return {} as Quote;
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }
}
