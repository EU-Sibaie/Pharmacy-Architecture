'use client';

import { Box, Container } from '@mui/material';

import { MainNav } from './main-nav';
import { useSidebar } from './sidebar-context';

export const ContentArea = ({ children }: { children: React.ReactNode }) => {
  const { collapsed } = useSidebar();

  return (
    <Box
      sx={{
        display: 'flex',
        flex: '1 1 auto',
        flexDirection: 'column',
        pl: {
          lg: collapsed ? '60px' : '240px',
        },
        transition: 'padding-left 0.3s ease',
      }}
    >
      <MainNav />
      <main style={{ backgroundColor: '#f9f9f9'}}>
        <Container maxWidth={'xl'} sx={{ pt: '24px' }}>
          {children}
        </Container>
      </main>
    </Box>
  );
};
