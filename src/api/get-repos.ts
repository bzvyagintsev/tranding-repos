import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { ReposResponse } from '@/types/repos';

// https://api.github.com/search/repositories?q=created:%3E2017-01-10&sort=stars&order=desc

export const getRepos = (): Promise<{ data: ReposResponse }> => {
  return api.get(
    '/search/repositories?q=created:>2017-01-10&sort=stars&order=desc',
  );
};

export const useRepos = () => {
  return useQuery({
    queryKey: ['repos'],
    queryFn: () => getRepos(),
  });
};
