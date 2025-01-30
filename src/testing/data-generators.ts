import {
  randCompanyName,
  randUserName,
  randParagraph,
  randNumber,
  randLanguage,
} from '@ngneat/falso';

import { Repo } from '@/types/repos';

const mockUrl = 'https://github.com/wudifamo/Neleme';

export const generateRepo = (): Repo => ({
  id: randNumber(),
  name: randCompanyName(),
  html_url: mockUrl,
  description: randParagraph(),
  stargazers_count: randNumber(),
  language: randLanguage(),
  owner: {
    login: randUserName(),
    avatar_url: './mock-avatar.png',
  },
  updated_at: Date.now().toString(),
});
