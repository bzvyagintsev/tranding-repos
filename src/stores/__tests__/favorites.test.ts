import { randNumber } from '@ngneat/falso';
import { act, renderHook } from '@testing-library/react';

import { useFavorites, FAVORITES_KEY } from '../favorites';

const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
};

vi.stubGlobal('localStorage', localStorageMock);

describe('Favorites Store with localStorage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call localStorage when getting state', () => {
    vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify([]));

    renderHook(() => useFavorites());

    expect(localStorage.getItem).toHaveBeenCalledWith(FAVORITES_KEY);
  });

  it('should call localStorage when setting state', () => {
    const repo = randNumber();

    vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify([]));
    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.toggleFavorite(repo);
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      FAVORITES_KEY,
      JSON.stringify([repo]),
    );
  });

  it('should return stored favorites', () => {
    const repos = [randNumber(), randNumber()];

    vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify(repos));

    const { result } = renderHook(() => useFavorites());

    expect(result.current.favorites).toEqual(repos);
  });

  it('should return an empty array if no favorites are stored', () => {
    vi.mocked(localStorage.getItem).mockReturnValue(null);

    const { result } = renderHook(() => useFavorites());

    expect(result.current.favorites).toEqual([]);
  });

  it('should add a repository to favorites when toggled', () => {
    const repo = randNumber();

    vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify([]));

    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.toggleFavorite(repo);
    });

    expect(result.current.favorites).toEqual([repo]);
  });

  it('should remove a repository from favorites when toggled again', () => {
    const repo = randNumber();

    vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify([repo]));

    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.toggleFavorite(repo);
    });

    expect(result.current.favorites).toEqual([]);
  });

  it('should check if a repository is favorited', () => {
    const repo = randNumber();
    const repo2 = randNumber();

    vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify([repo]));

    const { result } = renderHook(() => useFavorites());

    expect(result.current.favorites.includes(repo)).toBe(true);
    expect(result.current.favorites.includes(repo2)).toBe(false);
  });

  it('should handle multiple repositories being favorited', () => {
    const repo = randNumber();
    const repo2 = randNumber();
    const repo3 = randNumber();

    vi.mocked(localStorage.getItem).mockReturnValueOnce(JSON.stringify([repo]));

    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.toggleFavorite(repo2);
    });

    act(() => {
      result.current.toggleFavorite(repo3);
    });

    expect(result.current.favorites).toEqual([repo, repo2, repo3]);
  });

  it('should not add duplicates when a repository is toggled multiple times', () => {
    const repo = randNumber();

    vi.mocked(localStorage.getItem).mockReturnValueOnce(JSON.stringify([repo]));

    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.toggleFavorite(repo);
    });

    act(() => {
      result.current.toggleFavorite(repo);
    });

    expect(result.current.favorites).toEqual([repo]);
  });
});
