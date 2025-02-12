# GitHub Trending Repositories Client

## Overview

This project is a small client application designed for discovering trending repositories on GitHub. The application displays a list of repositories created in the last year with the most stars, allowing users to favorite them for easy access.

## Features

- **Trending Repositories**: Displays a list of repositories created in the last year with the highest number of stars on GitHub.
- **Favorites**: Users can favorite repositories, which are stored locally (e.g., in local storage) and can be viewed through a filter.
- **Repository Information**: Each repository card displays essential information, including the repository name, link to GitHub, description, and number of stars.
- **Language Filter**: Users can filter repositories by programming languages.

## Technology Stack

- **Frontend**:

  - React
  - Vite
  - TypeScript
  - Tailwind CSS
  - ShadcnUI
  - Tanstack Query
  - Axios
  - Zod

- **Testing**:

  - Vitest
  - Nock
  - React Testing Library

- **Code Quality**:
  - ESLint
  - Prettier

## Project Structure

```
src/
├── api/          # API endpoints configuration
├── assets/       # Static assets (images, icons)
├── components/   # React components
│   ├── repos/    # Repository-specific components
│   └── ui/       # Reusable UI components
├── lib/          # Utility functions and configurations (Axios, React Query)
├── stores/       # Global state management (Favorite repos)
├── testing/      # Test framework
└── types/        # Zod schemas
```

### Key Files

- `src/components/repos/repo-list.tsx` - Main component for displaying and filtering repositories
- `src/components/repos/repo-card.tsx` - Repository card component for displaying repository information
- `src/components/ui/` - Reusable UI components like buttons, inputs, and pagination
- `src/stores/favorites.ts` - Favorites management using local storage
- `src/api/github.ts` - GitHub API client configuration

## GitHub API Specifications

This application utilizes the GitHub REST API v3, specifically the [Search endpoint](https://docs.github.com/en/rest/search/search?apiVersion=2022-11-28#search-repositories).

### Search Repositories Endpoint

```
GET /search/repositories
```

#### Query Parameters

- `q`: Search query string that includes:
  - `created:>YYYY-MM-DD` - Filter for repositories created after a specific date
  - `language:X` - Filter by programming language
- `sort`: Can be "stars", "forks", "help-wanted-issues", "updated"
- `order`: "desc" or "asc"
- `per_page`: Results per page (max 100)
- `page`: Page number for pagination

#### Example Request

```
GET /search/repositories?q=created:>2024-02-12+language:javascript&sort=stars&order=desc&per_page=50&page=1
```

### Limits

- For unauthenticated requests: 10 requests per minute
- Search results are paginated and limited to the first 1,000 matches

## Future Improvements

With a larger timeline, the following enhancements could be made:

- **Mock Service Worker (MSW)**: Use MSW and a local database for more robust testing.
- **Responsive Design**: Implement a responsive design to ensure the application provides an optimal viewing experience.
- **Accessibility Enhancements**: Improve accessibility features to ensure that the application is usable by individuals with disabilities.

## Next Steps

As the project grows, consider introducing Tanstack Router to enhance the project structure, including routing and a feature-based architecture.
