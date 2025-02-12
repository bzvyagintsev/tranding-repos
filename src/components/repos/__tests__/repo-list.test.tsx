import { fireEvent } from '@testing-library/react';
import nock from 'nock';

import { getGithubQuery } from '@/api/get-repos';
import { RepoList } from '@/components/repos/repo-list';
import { API_URL } from '@/lib/api-client';
import { FAVORITES_KEY } from '@/stores/favorites';
import { generateRepo } from '@/testing/data-generators';
import { renderApp, screen } from '@/testing/test-utils';

describe('RepoList', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should render RepoList with non-empty repos', async () => {
    const repo = generateRepo();
    const repo2 = generateRepo();

    const data = {
      items: [repo, repo2],
      total_count: 2,
    };

    nock(API_URL)
      .get(
        `/search/repositories?q=${getGithubQuery()}&sort=stars&order=desc&page=1&per_page=50`,
      )
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
      .get(
        `/search/repositories?q=${getGithubQuery()}&sort=stars&order=desc&page=1&per_page=50`,
      )
      .reply(200, data);

    renderApp(<RepoList />);

    expect(
      await screen.findByText('No repositories found'),
    ).toBeInTheDocument();
  });

  it('should render error if bad request', async () => {
    nock(API_URL)
      .get(
        `/search/repositories?q=${getGithubQuery()}&sort=stars&order=desc&page=1&per_page=50`,
      )
      .reply(404, {});

    renderApp(<RepoList />);

    expect(
      await screen.findByText('Error loading repositories.'),
    ).toBeInTheDocument();
  });

  it('should filter repos by language', async () => {
    const repo = generateRepo({ language: 'JavaScript' });
    const repo2 = generateRepo({ language: 'Python' });

    const data = {
      items: [repo, repo2],
      total_count: 2,
    };

    nock(API_URL)
      .get(
        `/search/repositories?q=${getGithubQuery()}&sort=stars&order=desc&page=1&per_page=50`,
      )
      .reply(200, data);

    nock(API_URL)
      .get(
        `/search/repositories?q=${getGithubQuery('javascript')}&sort=stars&order=desc&page=1&per_page=50`,
      )
      .reply(200, {
        items: [repo],
        total_count: 1,
      });

    renderApp(<RepoList />);

    await screen.findByText(`${repo.owner.login}/${repo.name}`);

    const input = screen.getByPlaceholderText('Filter by language...');
    fireEvent.change(input, { target: { value: 'javascript' } });

    await screen.findByText('1-50 of 1');

    expect(
      screen.getByText(`${repo.owner.login}/${repo.name}`),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(`${repo2.owner.login}/${repo2.name}`),
    ).not.toBeInTheDocument();
  });

  it('should handle pagination', async () => {
    const repos = Array.from({ length: 55 }, () => generateRepo());
    const firstPageData = {
      items: repos.slice(0, 50),
      total_count: 55,
    };
    const secondPageData = {
      items: repos.slice(50),
      total_count: 55,
    };

    nock(API_URL)
      .get(
        `/search/repositories?q=${getGithubQuery()}&sort=stars&order=desc&page=1&per_page=50`,
      )
      .reply(200, firstPageData);

    nock(API_URL)
      .get(
        `/search/repositories?q=${getGithubQuery()}&sort=stars&order=desc&page=2&per_page=50`,
      )
      .reply(200, secondPageData);

    renderApp(<RepoList />);

    expect(
      await screen.findByText(`${repos[0].owner.login}/${repos[0].name}`),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Go to next page'));

    expect(
      await screen.findByText(`${repos[10].owner.login}/${repos[10].name}`),
    ).toBeInTheDocument();
  });

  it('should show favorites', async () => {
    const repo = generateRepo();
    const repo2 = generateRepo();
    localStorage.setItem(FAVORITES_KEY, JSON.stringify([repo]));

    const data = {
      items: [repo, repo2],
      total_count: 2,
    };

    nock(API_URL)
      .get(
        `/search/repositories?q=${getGithubQuery()}&sort=stars&order=desc&page=1&per_page=50`,
      )
      .reply(200, data);

    renderApp(<RepoList />);

    await screen.findByText(`${repo.owner.login}/${repo.name}`);

    fireEvent.click(screen.getByText('Show Starred'));

    expect(
      screen.getByText(`${repo.owner.login}/${repo.name}`),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(`${repo2.owner.login}/${repo2.name}`),
    ).not.toBeInTheDocument();
  });
});
