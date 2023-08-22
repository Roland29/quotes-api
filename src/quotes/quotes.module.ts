import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';
import { MongooseModule } from '@nestjs/mongoose';
import { QuotesService } from './quotes.service';
import { QuotesResolver } from './quotes.resolver';
import { QuoteSchema, Quote } from './models/quote.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Quote.name, schema: QuoteSchema }]),
  ],
  providers: [QuotesService, QuotesResolver, DateScalar],
})
export class QuotesModule {}
