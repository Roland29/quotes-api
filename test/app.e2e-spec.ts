import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import supertest from 'supertest';
import { AppModule } from '../src/app.module';
import { DatabaseService } from '../src/database/database.service';
import { Connection } from 'mongoose';

describe('QuotesApi (e2e)', () => {
  let dbConnection: Connection;
  let app: INestApplication;
  let httpServer: supertest.SuperTest<supertest.Test>;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [AppModule], // Import your app module
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
    dbConnection = moduleRef
      .get<DatabaseService>(DatabaseService)
      .getDbHandle();
    httpServer = supertest(app.getHttpServer());
  });

  beforeEach(async () => {
    await dbConnection.collection('quotes').deleteMany({});
  });

  afterAll(async () => {
    await app.close();
  });

  it('should get a quote by ID', async () => {
    const quote = await dbConnection
      .collection('quotes')
      .insertOne({ author: 'XXXX', content: 'test' });
    // Send a GraphQL query using the Apollo Client
    const query = `
    query {
      quote(id: ${quote}) {
        id
        text
        // Add other fields you want to test
      }
    }
  `;

    const response = await httpServer.post('/graphql').send({ query });
    const { data, errors } = response.body;

    // Assert that there are no errors
    expect(errors).toBeUndefined();

    // Assert the expected data
    expect(data).toEqual({
      quote: {
        id: 'your-quote-id',
        text: 'Your quote text',
        // Add other expected data fields here
      },
    });
  });
});
