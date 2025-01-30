import { useState, useEffect } from 'react';

export const FAVORITES_KEY = 'favorite_repos';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<number[]>(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (repoId: number) => {
    setFavorites(() =>
      favorites.includes(repoId)
        ? favorites.filter((id) => id !== repoId)
        : [...favorites, repoId],
    );
  };

  return { favorites, toggleFavorite };
};
