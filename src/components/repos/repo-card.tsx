import { Star, Globe, StarOff } from 'lucide-react';

import { Repo } from '@/types/repos';

import { Toggle } from '../ui/toggle';

interface Props {
  repo: Repo;
  favorited: boolean;
  onStarClick: (pressed: boolean) => void;
}

export function RepoCard({ repo, favorited, onStarClick }: Props) {
  const {
    name,
    description,
    stargazers_count,
    language,
    html_url,
    updated_at,
    owner,
  } = repo;

  return (
    <div className="flex gap-4 rounded-2xl border bg-white p-4 shadow-sm">
      <img
        src={owner.avatar_url}
        alt={`${owner}'s avatar`}
        className="size-12 rounded-full"
      />

      <div className="flex flex-1 flex-col gap-3">
        <a href={html_url} target="_blank" rel="noopener noreferrer">
          <h3 className="text-lg font-semibold text-blue-600 hover:underline">
            {owner.login}/{name}
          </h3>
        </a>

        <p className="text-sm ">{description || 'No description provided'}</p>

        <div className="flex flex-wrap items-center gap-2">
          {language && (
            <div className="rounded-full bg-secondary px-2 py-1 text-xs text-secondary-foreground">
              {language}
            </div>
          )}
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star size={16} />
            <span>{stargazers_count.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <Globe size={16} />
            <span>Updated {updated_at}</span>
          </div>
        </div>
      </div>

      <Toggle
        aria-label="Toggle favorite"
        onPressedChange={onStarClick}
        pressed={favorited}
      >
        {favorited ? (
          <StarOff size={18} data-testid="star-off-icon" />
        ) : (
          <Star size={18} data-testid="star-icon" />
        )}
      </Toggle>
    </div>
  );
}
