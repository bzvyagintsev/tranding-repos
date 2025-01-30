# GitHub Trending Repositories Client

## Overview

This project is a small client application designed for discovering trending repositories on GitHub. The application displays a list of repositories created in the last 7 days with the most stars, allowing users to favorite them for easy access.

## Features

- **Trending Repositories**: Displays a list of repositories created in the last 7 days with the highest number of stars on GitHub.
- **Favorites**: Users can favorite repositories, which are stored locally (e.g., in local storage or cookies) and can be viewed through a filter or in a separate tab.
- **Repository Information**: Each repository card displays essential information, including the repository name, link to GitHub, description, and number of stars.
- **Language Filter (Bonus)**: If time allows, users can filter repositories by programming languages.

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
  - Local filtration for favorites and language filters based on the requested data
- **RepoCard Component**: Displays repository data and provides a callback for toggling favorite status.

## Future Improvements

With a larger timeline, the following enhancements could be made:

- **Pagination**: Implement pagination to view more repositories from GitHub.
- **URL Query Parameters**: Make language filtration based on query parameters in the URL, along with other filters.
- **Mock Service Worker (MSW)**: Use MSW and a local database for more robust testing.

## Next Steps

As the project grows, consider introducing Tanstack Router to enhance the project structure, including routing and a feature-based architecture.
