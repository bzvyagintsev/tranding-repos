import { render } from '@testing-library/react';

import { AppProvider } from '@/provider';

export const renderApp = (
  ui: any,
  { ...renderOptions }: Record<string, any> = {},
) => {
  const returnValue = {
    ...render(ui, {
      wrapper: AppProvider,
      ...renderOptions,
    }),
  };

  return returnValue;
};

export * from '@testing-library/react';
export { userEvent } from '@testing-library/user-event';
