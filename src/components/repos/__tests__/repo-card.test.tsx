import { RepoCard } from '@/components/repos/repo-card';
import { generateRepo } from '@/testing/data-generators';
import { renderApp, screen, userEvent, waitFor } from '@/testing/test-utils';

describe('RepoCard', () => {
  it('should render RepoCard', async () => {
    const repo = generateRepo();

    const onStarClick = vi.fn();

    renderApp(
      <RepoCard repo={repo} onStarClick={onStarClick} favorited={false} />,
    );

    expect(
      screen.getByText(`${repo.owner.login}/${repo.name}`),
    ).toBeInTheDocument();
  });

  it('should trigger onStarClick callback when click on star button', async () => {
    const repo = generateRepo();

    const onStarClick = vi.fn();

    renderApp(
      <RepoCard repo={repo} onStarClick={onStarClick} favorited={false} />,
    );

    await userEvent.click(screen.getByRole('button'));

    await waitFor(() => expect(onStarClick).toHaveBeenCalledTimes(1));
  });

  it('displays the star-off toggle if not favorited', async () => {
    const repo = generateRepo();
    const onStarClick = vi.fn();

    renderApp(
      <RepoCard repo={repo} onStarClick={onStarClick} favorited={false} />,
    );

    const button = screen.getByLabelText(/Toggle favorite/i);

    expect(button).toContainElement(screen.getByTestId('star-icon'));
  });

  it('displays the star-off toggle if favorited', async () => {
    const repo = generateRepo();
    const onStarClick = vi.fn();

    renderApp(
      <RepoCard repo={repo} onStarClick={onStarClick} favorited={true} />,
    );

    const button = screen.getByLabelText(/Toggle favorite/i);

    expect(button).toContainElement(screen.getByTestId('star-off-icon'));
  });
});
