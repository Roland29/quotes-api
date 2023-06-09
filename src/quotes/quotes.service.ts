import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewQuoteInput } from './dto/new-quote.input';
import { QuotesArgs } from './dto/quotes.args';
import { Quote } from './models/quote.model';

@Injectable()
export class QuotesService {
  constructor(
    @InjectModel(Quote.name) private readonly quoteModel: Model<Quote>,
  ) {}
  async create(data: NewQuoteInput): Promise<Quote> {
    return this.quoteModel.create(data);
  }

  async findAll(quotesArgs: QuotesArgs): Promise<Quote[]> {
    return this.quoteModel.find().exec();
  }

  async findOneById(id: number): Promise<Quote> {
    return {} as Quote;
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }
}
