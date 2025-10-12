'use client'

// SideNav.tsx
import { useSidebar } from './sidebar-context';
import { SidebarContent } from './sidebarContent';
import { usePathname } from 'next/navigation';
import { Box } from '@mui/material';

export function SideNav(): React.JSX.Element {
  const { collapsed } = useSidebar();
  const pathname = usePathname();

  return (
    <Box
    sx={{
      '--SideNav-background': '#141b2a',
      '--SideNav-color': '#1A1A1A',
      '--NavItem-color': '#fff',
      '--NavItem-hover-background': '#f5f5f5',
      '--NavItem-active-background': '#5625f2',
      '--NavItem-active-color': '#fff',
      '--NavItem-disabled-color': '#aaa',
      '--NavItem-icon-color': '#9e9e9e',
      '--NavItem-icon-active-color': '#fff',
      '--NavItem-icon-disabled-color': '#c2c2c2',
      bgcolor: 'var(--SideNav-background)',
      color: 'var(--SideNav-color)',
      display: { xs: 'none', lg: 'flex' },
      flexDirection: 'column',
      height: '100%',
      left: 0,
      position: 'fixed',
      top: 0,
      width: collapsed ? '60px' : '240px',
      transition: 'width 0.3s ease',
      boxShadow: '2px 0 8px rgba(0, 0, 0, 0.03)',
      borderRight: '1px solid #eee',
      zIndex: 1100,
      '&::-webkit-scrollbar': { display: 'none' },
    }}
    >
      <SidebarContent collapsed={collapsed} pathname={pathname} />
    </Box>
  );
}
