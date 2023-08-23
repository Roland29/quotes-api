import { Test, TestingModule } from '@nestjs/testing';
import { QuotesResolver } from './quotes.resolver';
import { QuotesService } from './quotes.service';
import { NotFoundException } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

describe('QuotesResolver', () => {
  let resolver: QuotesResolver;
  let quotesService: any;
  let pubSub: any;

  beforeEach(async () => {
    pubSub = { publish: jest.fn(), asyncIterator: jest.fn() };
    quotesService = {
      findOneById: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      remove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuotesResolver,
        {
          provide: QuotesService,
          useValue: quotesService,
        },
        {
          provide: PubSub,
          useValue: pubSub,
        },
      ],
    }).compile();

    resolver = module.get<QuotesResolver>(QuotesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('quote', () => {
    it('should return a single quote', async () => {
      const result = { id: '123', author: 'Author', sentence: 'Sentence' };
      quotesService.findOneById.mockResolvedValue(result);
      expect(await resolver.quote('123')).toEqual(result);
    });

    it('should throw a NotFoundException', async () => {
      quotesService.findOneById.mockResolvedValue(null);
      await expect(resolver.quote('123')).rejects.toThrow(NotFoundException);
    });
  });

  describe('quotes', () => {
    it('should return a list of quotes', async () => {
      const result = [{ id: '123', author: 'Author', sentence: 'Sentence' }];
      quotesService.findAll.mockResolvedValue(result);
      expect(await resolver.quotes({ skip: 1, limit: 1 })).toEqual(result);
    });
  });

  describe('addQuote', () => {
    it('should create a new quote and publish it', async () => {
      const input = { author: 'Author', sentence: 'Sentence' };
      const result = { id: '123', ...input };
      quotesService.create.mockResolvedValue(result);

      const quote = await resolver.addQuote(input);

      expect(quote).toEqual(result);
      expect(quotesService.create).toHaveBeenCalledWith(input);
      expect(pubSub.publish).toHaveBeenCalledWith('quoteAdded', {
        quoteAdded: quote,
      });
    });
  });

  describe('removeQuote', () => {
    it('should remove a quote', async () => {
      quotesService.remove.mockResolvedValue(true);
      expect(await resolver.removeQuote('123')).toBeTruthy();
    });
  });
});
