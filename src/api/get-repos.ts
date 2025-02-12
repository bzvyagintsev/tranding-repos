import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { ReposResponse } from '@/types/repos';

interface GetReposParams {
  page: number;
  language?: string;
}

export const getRepos = ({
  page,
  language,
}: GetReposParams): Promise<{ data: ReposResponse }> => {
  return api.get(
    `/search/repositories?q=${getGithubQuery(language)}&sort=stars&order=desc&page=${page}&per_page=50`,
  );
};

export const useRepos = (page: number, language?: string) => {
  return useQuery({
    queryKey: ['repos', { page, language }],
    queryFn: () => getRepos({ page, language }),
    keepPreviousData: true,
  });
};

export const getGithubQuery = (language?: string) => {
  const yearAgo = new Date();
  yearAgo.setDate(yearAgo.getDate() - 365);
  const dateQuery = yearAgo.toISOString().split('T')[0];

  let query = `created:>${dateQuery}`;
  if (language) {
    query += `+language:${language}`;
  }

  return query;
};
