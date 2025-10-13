// SidebarContent.tsx
'use client';
import * as React from 'react';
import RouterLink from 'next/link';
import { Box, Collapse, Stack, Tooltip, Typography } from '@mui/material';
import { isNavItemActive } from '@/lib/is-nav-item-active';
import { navItems } from './config';
import { navIcons } from './nav-icons';

export function SidebarContent({
  pathname,
  collapsed,
  onClose,
}: {
  pathname: string;
  collapsed: boolean;
  onClose?: () => void;
}) {
  return (
    <>
      <Stack
        spacing={2}
        sx={{
          px: 2,
          pt: 1,
          mb: 2,
          alignItems: collapsed ? 'center' : 'space-between',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Box
          width={collapsed ? 40 : 100}
          height={collapsed ? 40 : 80}
          sx={{ display: 'flex', alignItems: 'center', py: collapsed ? 1 : 2 }}
        >
        </Box>
      </Stack>

      <Box component="nav" sx={{ flex: '1 1 auto', px: 1 }}>
        {renderNavItems({ pathname, items: navItems, collapsed, onClose })}
      </Box>
    </>
  );
}

function renderNavItems({
  items = [],
  pathname,
  depth = 0,
  collapsed,
  onClose,
}: {
  items?: any[];
  pathname: string;
  depth?: number;
  collapsed: boolean;
  onClose?: () => void;
}): React.JSX.Element {
  return (
    <Stack component="ul" spacing={1} sx={{ listStyle: 'none', m: 0, p: 0 }}>
      {items.map(({ key, ...rest }) => (
        <NavItem onClose={onClose} key={key} {...rest} pathname={pathname} depth={depth} collapsed={collapsed} />
      ))}
    </Stack>
  );
}

interface NavItemProps extends Omit<any, 'items'> {
  pathname: string;
  items?: any[];
  depth?: number;
  collapsed: boolean;
  onClose?: () => void;
}

function NavItem({
  disabled,
  external,
  href,
  icon,
  matcher,
  pathname,
  title,
  items,
  depth = 0,
  collapsed,
  onClose,
}: NavItemProps): React.JSX.Element {
  const active = isNavItemActive({ disabled, external, href, matcher, pathname });
  const Icon = icon ? navIcons[icon] : null;
  const hasChildren = Array.isArray(items) && items.length > 0;
  const [open, setOpen] = React.useState(false);

  const handleToggle = () => {
    if (hasChildren) {
      setOpen((prev) => !prev);
    } else {
      onClose?.();
    }
  };

  const NavContent = (
    <Box
      onClick={handleToggle}
      {...(href
        ? {
            component: external ? 'a' : RouterLink,
            href,
            target: external ? '_blank' : undefined,
            rel: external ? 'noreferrer' : undefined,
          }
        : { role: 'button' })}
      sx={{
        alignItems: 'center',
        borderRadius: '12px',
        color: 'var(--NavItem-color)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        display: 'flex',
        gap: 1.5,
        p: '10px',
        pl: collapsed ? 1 : `${16 + depth * 12}px`,
        textDecoration: 'none',
        ...(disabled && { color: 'var(--NavItem-disabled-color)' }),
        ...(!active && {
          '&:hover': {
            bgcolor: '#a19236',
            color: '#fff',
          },
        }),
        ...(active && {
          bgcolor: '#a19236',
          color: '#fff',
        }),
      }}
    >
      {Icon && (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Icon size={20} weight={active ? 'fill' : 'regular'} color="#fff" />
        </Box>
      )}
      {!collapsed && (
        <Typography component="span" sx={{ fontSize: '0.875rem', fontWeight: 500, lineHeight: '24px' }}>
          {title}
        </Typography>
      )}
    </Box>
  );

  return (
    <li>
      {collapsed ? (
        <Tooltip title={title} placement="right">
          {NavContent}
        </Tooltip>
      ) : (
        NavContent
      )}
      {hasChildren && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <Box sx={{ mt: 1, ml: 1 }}>{renderNavItems({ items, pathname, depth: depth + 1, collapsed, onClose })} </Box>
        </Collapse>
      )}
    </li>
  );
}
