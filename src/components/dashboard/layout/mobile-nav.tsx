// MobileSideNav.tsx
'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { Drawer } from '@mui/material';

import { SidebarContent } from './sidebarContent';

// import { SidebarContent } from './SidebarContent';

export function MobileSideNav({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          bgcolor: '#141b2a',
          width: '240px',
          color: '#fff',
        },
      }}
    >
      <SidebarContent onClose={onClose} pathname={pathname} collapsed={false} />
    </Drawer>
  );
}
