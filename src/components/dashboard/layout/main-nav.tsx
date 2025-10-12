'use client';

import * as React from 'react';
import { getAvatarInitials } from '@/helper/general';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { CaretDoubleLeft, CaretDoubleRight, List } from '@phosphor-icons/react';
import { usePopover } from '@/hooks/use-popover';
import { MobileSideNav } from './mobile-nav';
import { useSidebar } from './sidebar-context';
import { UserPopover } from './user-popover';

export function MainNav(): React.JSX.Element {
  const [openNav, setOpenNav] = React.useState<boolean>(false);
  const { collapsed, toggleCollapse } = useSidebar();
  const userPopover = usePopover<HTMLDivElement>();
  const userDetail = localStorage?.getItem('userDetail');
  const userName = (userDetail && `${JSON.parse(userDetail)?.firstName} ${JSON.parse(userDetail)?.lastName}`) || '';
  const avatarInitials = getAvatarInitials({ isSenderName: userName });

  return (
    <React.Fragment>
      <Box
        component="header"
        sx={{
          borderBottom: '1px solid var(--mui-palette-divider)',
          backgroundColor: '#fff',
          position: 'sticky',
          top: 0,
          zIndex: 'var(--mui-zIndex-appBar)',
        }}
      >
        <Stack
          direction="row"
          spacing={2}
          sx={{ alignItems: 'center', justifyContent: 'space-between', minHeight: '64px', px: 2 }}
        >
          <Box>
            <IconButton
              sx={{ display: { xs: 'none', sm: 'none', lg: 'block', md: 'block', ml: 'auto' } }}
              size="small"
              type="button"
              onClick={toggleCollapse}
            >
              {collapsed ? <CaretDoubleRight size={20} weight="bold" /> : <CaretDoubleLeft size={20} weight="bold" />}
            </IconButton>
            <IconButton
              onClick={(): void => {
                setOpenNav(true);
              }}
              sx={{ display: { lg: 'none', md: 'none' } }}
            >
              <List />
            </IconButton>
          </Box>
          <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
            <Avatar onClick={userPopover.handleOpen} ref={userPopover.anchorRef} sx={{ cursor: 'pointer' }}>
              {avatarInitials}
            </Avatar>
          </Stack>
        </Stack>
      </Box>
      <UserPopover anchorEl={userPopover.anchorRef.current} onClose={userPopover.handleClose} open={userPopover.open} />
      <MobileSideNav
        onClose={() => {
          setOpenNav(false);
        }}
        open={openNav}
      />
    </React.Fragment>
  );
}
