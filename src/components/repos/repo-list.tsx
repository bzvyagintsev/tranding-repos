import { useEffect, useState } from 'react';

import { useRepos } from '@/api/get-repos';
import { RepoCard } from '@/components/repos/repo-card';
import { RepoPagination } from '@/components/repos/repo-pagination';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFavorites } from '@/stores/favorites';

export function RepoList() {
  const [page, setPage] = useState(1);
  const [language, setLanguage] = useState<string>('');
  const [debouncedLanguage, setDebouncedLanguage] = useState(language);

  const [showFavorites, setShowFavorites] = useState(false);

  const { data, isLoading, error } = useRepos(page, debouncedLanguage);
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedLanguage(language);
    }, 500);

    return () => clearTimeout(handler);
  }, [language]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading repositories.</p>;

  const repos = data?.data;
  if (!repos) return null;

  const displayedRepos = showFavorites ? favorites : repos.items;
  const totalPages = Math.ceil(Math.min(repos.total_count, 1000) / 50);

  function onPageChange(page: number) {
    window.scrollTo(0, 0);

    setPage(page);
  }

  if (showFavorites) {
    return (
      <div>
        <h1 className="mb-12 text-7xl">Favorites</h1>
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>{displayedRepos.length} favorite results</div>

          <Button onClick={() => setShowFavorites((prev) => !prev)}>
            Show All
          </Button>
        </div>

        <div className="mb-4 grid gap-4">
          {displayedRepos.length === 0 && <p>No favorite repositories yet</p>}

          {displayedRepos.map((repo) => (
            <RepoCard
              key={repo.id}
              repo={repo}
              favorited={isFavorite(repo.id)}
              onStarClick={() => toggleFavorite(repo)}
            />
          ))}
        </div>
      </div>
    );
  }
  return (
    <div>
      <h1 className="mb-12 text-7xl">Trending repos</h1>

      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          {`${(page - 1) * 50 + 1}-${Math.min(page * 50, 1000)} of ${repos.total_count}`}
        </div>

        <div className="ml-auto">
          <Input
            type="text"
            placeholder="Filter by language..."
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-[180px]"
          />
        </div>

        <Button onClick={() => setShowFavorites((prev) => !prev)}>
          Show Starred
        </Button>
      </div>

      <div className="mb-4 grid gap-4">
        {displayedRepos.length === 0 && <p>No repositories found</p>}

        {displayedRepos.map((repo) => (
          <RepoCard
            key={repo.id}
            repo={repo}
            favorited={isFavorite(repo.id)}
            onStarClick={() => toggleFavorite(repo)}
          />
        ))}
      </div>

      <RepoPagination
        page={page}
        totalPages={totalPages}
        onChange={onPageChange}
      />
    </div>
  );
}
