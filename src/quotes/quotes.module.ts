import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';
import { QuotesService } from './quotes.service';
import { QuotesResolver } from './quotes.resolver';

@Module({
  providers: [QuotesService, QuotesResolver, DateScalar],
})
export class QuotesModule {}
