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

## Implemented Functionality

- **Application Provider**: Contains Error Boundary, QueryClient, and Suspense.
- **Component Library**: A small library of reusable components for building the UI.
- **RepoList Component**: Handles the main logic of the application, including:
  - Fetching data from GitHub
  - Managing favorite repositories
  - Local filtration for favorites
  - Server pagination and filtration for language
- **RepoCard Component**: Displays repository data and provides a callback for toggling favorite status.

## Future Improvements

With a larger timeline, the following enhancements could be made:

- **Mock Service Worker (MSW)**: Use MSW and a local database for more robust testing.
- **Responsive Design**: Implement a responsive design to ensure the application provides an optimal viewing experience.
- **Accessibility Enhancements**: Improve accessibility features to ensure that the application is usable by individuals with disabilities.

## Next Steps

As the project grows, consider introducing Tanstack Router to enhance the project structure, including routing and a feature-based architecture.
