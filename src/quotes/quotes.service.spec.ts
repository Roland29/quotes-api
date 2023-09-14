import { Test, TestingModule } from '@nestjs/testing';
import { QuotesService } from './quotes.service';
import { getModelToken } from '@nestjs/mongoose';
import { Quote } from './models/quote.model';

describe('QuotesService', () => {
  let service: QuotesService;
  let mockQuoteModel: any;

  beforeEach(async () => {
    mockQuoteModel = {
      create: jest.fn(),
      find: jest.fn().mockReturnThis(),
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      exec: jest.fn(),
      findById: jest.fn(),
      findByIdAndRemove: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuotesService,
        {
          provide: getModelToken(Quote.name),
          useValue: mockQuoteModel,
        },
      ],
    }).compile();

    service = module.get<QuotesService>(QuotesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a quote', async () => {
      const data = { author: 'Author', content: 'content' };
      mockQuoteModel.create.mockResolvedValue(data);

      const result = await service.create(data);
      expect(result).toEqual(data);
      expect(mockQuoteModel.create).toHaveBeenCalledWith(data);
    });
  });

  describe('findAll', () => {
    it('should return a list of quotes with pagination', async () => {
      const quotes = [
        { author: 'Author1', content: 'content1' },
        { author: 'Author2', content: 'content2' },
      ];
      mockQuoteModel.exec.mockResolvedValue(quotes);

      const args = { skip: 5, limit: 10 };
      const result = await service.findAll(args);

      expect(result).toEqual(quotes);
      expect(mockQuoteModel.skip).toHaveBeenCalledWith(args.skip);
      expect(mockQuoteModel.limit).toHaveBeenCalledWith(args.limit);
    });
  });

  describe('findOneById', () => {
    it('should return a single quote', async () => {
      const quote = { id: '123', author: 'Author', content: 'content' };
      mockQuoteModel.findById.mockResolvedValue(quote);

      const result = await service.findOneById('123');

      expect(result).toEqual(quote);
      expect(mockQuoteModel.findById).toHaveBeenCalledWith('123');
    });
  });

  describe('remove', () => {
    it('should remove and return the removed quote', async () => {
      const quote = { id: '123', author: 'Author', content: 'content' };
      mockQuoteModel.findByIdAndRemove.mockResolvedValue(quote);

      const result = await service.remove('123');

      expect(result).toEqual(quote);
      expect(mockQuoteModel.findByIdAndRemove).toHaveBeenCalledWith('123');
    });
  });
});
