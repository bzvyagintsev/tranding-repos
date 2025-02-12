import { act, renderHook } from '@testing-library/react';

import { useFavorites, FAVORITES_KEY } from '@/stores/favorites';
import { generateRepo } from '@/testing/data-generators';

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
    const repo = generateRepo();

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
    const repos = [generateRepo(), generateRepo()];

    vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify(repos));

    const { result } = renderHook(() => useFavorites());

    expect(result.current.favorites).toEqual(repos);
  });

  it('should add repo to favorites when toggling', () => {
    const repo = generateRepo();

    vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify([]));

    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.toggleFavorite(repo);
    });

    expect(result.current.favorites).toEqual([repo]);
    expect(result.current.isFavorite(repo.id)).toBe(true);
  });

  it('should remove repo from favorites when toggling again', () => {
    const repo = generateRepo();

    vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify([repo]));

    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.toggleFavorite(repo);
    });

    expect(result.current.favorites).toEqual([]);
    expect(result.current.isFavorite(repo.id)).toBe(false);
  });

  it('should handle multiple repos in favorites', () => {
    const repos = [generateRepo(), generateRepo(), generateRepo()];

    vi.mocked(localStorage.getItem).mockReturnValue(JSON.stringify([repos[0]]));

    const { result } = renderHook(() => useFavorites());

    act(() => {
      result.current.toggleFavorite(repos[1]);
      result.current.toggleFavorite(repos[2]);
    });

    expect(result.current.favorites).toHaveLength(3);
    expect(result.current.isFavorite(repos[0].id)).toBe(true);
    expect(result.current.isFavorite(repos[1].id)).toBe(true);
    expect(result.current.isFavorite(repos[2].id)).toBe(true);
  });
});
