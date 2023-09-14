import { Test, TestingModule } from '@nestjs/testing';
import { ExecutionContext } from '@nestjs/common';
import { GqlApiKeyAuthGuard } from './apiKey-auth.guard';
import { GqlExecutionContext } from '@nestjs/graphql';

describe.skip('GqlApiKeyAuthGuard', () => {
  let guard: GqlApiKeyAuthGuard;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GqlApiKeyAuthGuard],
    }).compile();

    guard = module.get<GqlApiKeyAuthGuard>(GqlApiKeyAuthGuard);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('should return true for canActivate if authentication is successful', async () => {
    // Mock the ExecutionContext with a valid API key
    const mockContext: ExecutionContext = {
      getType: () => 'graphql',
      // getArgs: () => [[1], [2], [3], [4]],
      // getClass: () => 'Test',
      // getHandler: () => 'query',
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            'x-api-key': 'your-api-key', // Replace with a valid API key
          },
        }),
        getResponse: jest.fn(),
      }),
    } as unknown as ExecutionContext;

    // Wrap the mock context in GqlExecutionContext
    const gqlContext = GqlExecutionContext.create(mockContext);

    const canActivateResult = await guard.canActivate(gqlContext);

    expect(canActivateResult).toBe(true);
  });

  it('should return false for canActivate if authentication fails', async () => {
    // Mock the ExecutionContext with an invalid API key
    const mockContext: ExecutionContext = {
      switchToHttp: () => ({
        getRequest: () => ({
          headers: {
            'x-api-key': 'invalid-api-key',
          },
        }),
      }),
    } as ExecutionContext;

    // Wrap the mock context in GqlExecutionContext
    const gqlContext = GqlExecutionContext.create(mockContext);

    const canActivateResult = await guard.canActivate(gqlContext);

    expect(canActivateResult).toBe(false);
  });

  // Add more test cases to cover other scenarios as needed
});
