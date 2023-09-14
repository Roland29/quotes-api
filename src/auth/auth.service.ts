import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  validateApiKey(apiKey: string): boolean {
    const apiKeys: string[] = ['api-key-1', 'api-key-2'];
    return apiKeys.includes(apiKey);
  }
}
