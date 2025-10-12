'use client';

import { GlobalStyles } from '@mui/material';
import { Box } from '@mui/system';

import { useMessageNotification } from '@/hooks/useMessageNotification';
import { AuthGuard } from '@/components/auth/auth-guard';
import { LayoutProps } from '@/components/auth/layout';
import { ContentArea } from '@/components/dashboard/layout/content-area';
import { SideNav } from '@/components/dashboard/layout/side-nav';
import { SidebarProvider } from '@/components/dashboard/layout/sidebar-context';
import { MessageSnackbar } from '@/components/ui/messageSnackbar';

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  const { snackbarOpen, setSnackbarOpen, snackbarMessage } = useMessageNotification();

  return (
    <SidebarProvider>
      <AuthGuard>
        <GlobalStyles
          styles={{
            body: {
              '--MainNav-height': '56px',
              '--MainNav-zIndex': 1000,
              '--SideNav-width': '240px',
              '--SideNav-collapsed-width': '60px',
              '--SideNav-zIndex': 1100,
            },
          }}
        />
        <Box
          sx={{
            bgcolor: 'var(--mui-palette-background-default)',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            minHeight: '100%',
          }}
        >
          <SideNav />
          <ContentArea>{children}</ContentArea>
        </Box>
      </AuthGuard>
      <MessageSnackbar open={snackbarOpen} onClose={() => setSnackbarOpen(false)} message={snackbarMessage} />
    </SidebarProvider>
  );
}
