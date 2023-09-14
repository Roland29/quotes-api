import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { DirectiveLocation, GraphQLDirective } from 'graphql';
import { upperDirectiveTransformer } from './common/directives/upper-case.directive';
import { MongooseModule } from '@nestjs/mongoose';
import { QuotesModule } from './quotes/quotes.module';
import { join } from 'path';
import { ThrottlerModule } from '@nestjs/throttler';
import { GqlThrottlerGuard } from './common/guards/gqlThrottlerGuard';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    QuotesModule,
    MongooseModule.forRoot('mongodb://localhost:27017/test'),
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // Intervalle de temps en secondes
        limit: 1, // Nombre maximum de requêtes par intervalle de temps
      },
    ]),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ res, req }) => ({ res, req }),
      sortSchema: true,
      transformSchema: (schema) => upperDirectiveTransformer(schema, 'upper'),
      subscriptions: {
        'graphql-ws': true,
      },
      buildSchemaOptions: {
        directives: [
          new GraphQLDirective({
            name: 'upper',
            locations: [DirectiveLocation.FIELD_DEFINITION],
          }),
        ],
      },
    }),
    AuthModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GqlThrottlerGuard,
    },
  ],
})
export class AppModule {}
