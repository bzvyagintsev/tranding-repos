import { ReactNode } from 'react';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="container mx-auto flex max-w-screen-lg flex-col gap-4 py-8">
      {children}
    </div>
  );
}
