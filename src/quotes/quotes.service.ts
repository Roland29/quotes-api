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
    const { limit, skip } = quotesArgs;

    const query = this.quoteModel.find();

    if (typeof skip === 'number') {
      query.skip(skip);
    }

    if (typeof limit === 'number') {
      query.limit(limit);
    }

    return query.exec();
  }

  async findOneById(id: string): Promise<Quote> {
    return this.quoteModel.findById(id);
  }

  async remove(id: string): Promise<Quote> {
    return this.quoteModel.findByIdAndRemove(id);
  }
}
