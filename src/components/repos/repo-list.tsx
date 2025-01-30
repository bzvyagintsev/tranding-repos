import { useState } from 'react';

import { useFavorites } from '@/stores/favorites';

import { useRepos } from '../../api/get-repos';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

import { RepoCard } from './repo-card';

export function RepoList() {
  const { data, isLoading, error } = useRepos();
  const { favorites, toggleFavorite } = useFavorites();
  const [showFavorites, setShowFavorites] = useState(false);
  const [languageFilter, setLanguageFilter] = useState<string>('');

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading repositories.</p>;

  const repos = data?.data;

  if (!repos) return null;

  const getFilteredRepos = () => {
    let filtered = repos.items;

    if (languageFilter !== '') {
      filtered = filtered.filter((repo) => repo.language === languageFilter);
    }

    if (showFavorites) {
      filtered = filtered.filter((repo) => favorites.includes(repo.id));
    }

    return filtered;
  };

  const filteredRepos = getFilteredRepos();

  const languages = [
    ...new Set(
      repos.items.map((item) => item.language).filter((lang) => lang !== null),
    ),
  ];

  return (
    <div>
      <h1 className="mb-12 text-7xl">Trending repos</h1>

      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          {filteredRepos.length} out of {repos.total_count} results
        </div>

        <div className="ml-auto">
          <Select onValueChange={setLanguageFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by language" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Languages</SelectLabel>
                {languages.map((lang) => (
                  <SelectItem key={lang} value={lang}>
                    {lang}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Button onClick={() => setShowFavorites((prev) => !prev)}>
          {showFavorites ? 'Show All Repos' : 'Show Favorites'}
        </Button>
      </div>

      <div className="grid gap-4">
        {filteredRepos.length === 0 && <p>No repos</p>}

        {filteredRepos.map((repo) => (
          <RepoCard
            key={repo.id}
            repo={repo}
            favorited={favorites.includes(repo.id)}
            onStarClick={() => toggleFavorite(repo.id)}
          />
        ))}
      </div>
    </div>
  );
}
