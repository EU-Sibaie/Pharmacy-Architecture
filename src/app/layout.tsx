import * as React from 'react';
import type { Viewport } from 'next';
import '@/styles/global.css';
import { UserProvider } from '@/contexts/user-context';
import { LocalizationProvider } from '@/components/core/localization-provider';
import { ReactQueryProvider } from '@/components/core/react-query-provider';
import { ThemeProvider } from '@/components/core/theme-provider/theme-provider';

export const viewport = { width: 'device-width', initialScale: 1 } satisfies Viewport;

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  return (
    <html lang="en">
      <body>
        <LocalizationProvider>
          <UserProvider>
            <ReactQueryProvider>
              <ThemeProvider>{children}</ThemeProvider>
            </ReactQueryProvider>
          </UserProvider>
        </LocalizationProvider>
      </body>
    </html>
  );
}
