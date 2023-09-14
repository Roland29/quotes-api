import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseService } from './database.service';
import { Connection } from 'mongoose';
import { getConnectionToken } from '@nestjs/mongoose';

describe('DatabaseService', () => {
  let service: DatabaseService;
  let mockConnection: Partial<Connection>;

  beforeEach(async () => {
    mockConnection = {};

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DatabaseService,
        {
          provide: getConnectionToken(),
          useValue: mockConnection,
        },
      ],
    }).compile();

    service = module.get<DatabaseService>(DatabaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return the database connection', () => {
    const dbHandle = service.getDbHandle();
    expect(dbHandle).toBe(mockConnection); // Ensure it returns the mock connection
  });
});
