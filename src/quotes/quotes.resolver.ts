import { Inject, NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { NewQuoteInput } from './dto/new-quote.input';
import { QuotesArgs } from './dto/quotes.args';
import { Quote } from './models/quote.model';
import { QuotesService } from './quotes.service';
import { PubSub } from 'graphql-subscriptions';
import { PUB_SUB } from '../pubSub/PubSub.provider';
import { GqlApiKeyAuthGuard } from '../auth/guards/apiKey-auth.guard';

@UseGuards(GqlApiKeyAuthGuard)
@Resolver(() => Quote)
export class QuotesResolver {
  constructor(
    private readonly quotesService: QuotesService,
    @Inject(PUB_SUB) private readonly pubSub: PubSub,
  ) {}

  @Query(() => Quote)
  async quote(@Args('id') id: string): Promise<Quote> {
    const quote = await this.quotesService.findOneById(id);
    if (!quote) {
      throw new NotFoundException(id);
    }
    return quote;
  }

  @Query(() => [Quote])
  quotes(@Args() quotesArgs: QuotesArgs): Promise<Quote[]> {
    return this.quotesService.findAll(quotesArgs);
  }

  @Mutation(() => Quote)
  async addQuote(
    @Args('newQuoteData') newQuoteData: NewQuoteInput,
  ): Promise<Quote> {
    const quote = await this.quotesService.create(newQuoteData);
    await this.pubSub.publish('quoteAdded', { quoteAdded: quote });
    return quote;
  }

  @Mutation(() => Boolean)
  async removeQuote(@Args('id') id: string) {
    return !!(await this.quotesService.remove(id));
  }

  @Subscription(() => Quote)
  quoteAdded() {
    return this.pubSub.asyncIterator('quoteAdded');
  }
}
