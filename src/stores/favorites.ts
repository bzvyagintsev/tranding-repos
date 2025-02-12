import { useState, useEffect } from 'react';

import { Repo } from '@/types/repos';

export const FAVORITES_KEY = 'favorite_repos';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Repo[]>(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (repo: Repo) => {
    setFavorites((currentFavorites) =>
      currentFavorites.some((r) => r.id === repo.id)
        ? currentFavorites.filter((r) => r.id !== repo.id)
        : [...currentFavorites, repo],
    );
  };

  const isFavorite = (repoId: number) => {
    return favorites.some((repo) => repo.id === repoId);
  };

  return { favorites, toggleFavorite, isFavorite };
};
