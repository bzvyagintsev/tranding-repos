import nock from 'nock';

import { API_URL } from '@/lib/api-client';
import { generateRepo } from '@/testing/data-generators';
import { renderApp, screen } from '@/testing/test-utils';

import { RepoList } from '../repo-list';

describe('RepoList', () => {
  it('should render RepoList with non-empty repos', async () => {
    const repo = generateRepo();
    const repo2 = generateRepo();

    const data = {
      items: [repo, repo2],
      total_count: 2,
    };

    nock(API_URL)
      .get('/search/repositories?q=created:>2017-01-10&sort=stars&order=desc')
      .reply(200, data);

    renderApp(<RepoList />);

    expect(
      await screen.findByText(`${repo.owner.login}/${repo.name}`),
    ).toBeInTheDocument();
  });

  it('should render RepoList with empty repos', async () => {
    const data = {
      items: [],
      total_count: 0,
    };

    nock(API_URL)
      .get('/search/repositories?q=created:>2017-01-10&sort=stars&order=desc')
      .reply(200, data);

    renderApp(<RepoList />);

    expect(await screen.findByText(`No repos`)).toBeInTheDocument();
  });

  it('should render error if bad request', async () => {
    nock(API_URL)
      .get('/search/repositories?q=created:>2017-01-10&sort=stars&order=desc')
      .reply(404, {});

    renderApp(<RepoList />);

    expect(
      await screen.findByText(`Error loading repositories.`),
    ).toBeInTheDocument();
  });
});
