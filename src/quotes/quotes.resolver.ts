import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { NewQuoteInput } from './dto/new-quote.input';
import { QuotesArgs } from './dto/quotes.args';
import { Quote } from './models/quote.model';
import { QuotesService } from './quotes.service';

const pubSub = new PubSub();

@Resolver((of) => Quote)
export class QuotesResolver {
  constructor(private readonly quotesService: QuotesService) {}

  @Query((returns) => Quote)
  async quote(@Args('id') id: number): Promise<Quote> {
    const quote = await this.quotesService.findOneById(id);
    if (!quote) {
      throw new NotFoundException(id);
    }
    return quote;
  }

  @Query((returns) => [Quote])
  quotes(@Args() quotesArgs: QuotesArgs): Promise<Quote[]> {
    return this.quotesService.findAll(quotesArgs);
  }

  @Mutation((returns) => Quote)
  async addQuote(
    @Args('newQuoteData') newQuoteData: NewQuoteInput,
  ): Promise<Quote> {
    const quote = await this.quotesService.create(newQuoteData);
    await pubSub.publish('quoteAdded', { quoteAdded: quote });
    return quote;
  }

  @Mutation((returns) => Boolean)
  async removeQuote(@Args('id') id: string) {
    return this.quotesService.remove(id);
  }

  @Subscription((returns) => Quote)
  quoteAdded() {
    return pubSub.asyncIterator('quoteAdded');
  }
}
