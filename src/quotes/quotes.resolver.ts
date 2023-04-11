import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { Quote } from '../graphql.schema';
import { QuotesGuard } from './quotes.guard';
import { QuotesService } from './quotes.service';
import { CreateQuoteDto } from './dto/create-quote.dto';

const pubSub = new PubSub();

@Resolver('Quote')
export class QuotesResolver {
  constructor(private readonly quotesServices: QuotesService) {}

  @Query('quotes')
  @UseGuards(QuotesGuard)
  async getQuotes() {
    return this.quotesServices.findAll();
  }

  @Query('quote')
  async findOneById(
    @Args('id', ParseIntPipe)
    id: number,
  ): Promise<Quote> {
    return this.quotesServices.findOneById(id);
  }

  @Mutation('createQuote')
  async create(@Args('createQuoteInput') args: CreateQuoteDto): Promise<Quote> {
    const createdQuote = await this.quotesServices.create(args);
    pubSub.publish('quoteCreated', { quoteCreated: createdQuote });
    return createdQuote;
  }

  @Subscription('quoteCreated')
  quoteCreated() {
    return pubSub.asyncIterator('quoteCreated');
  }
}
