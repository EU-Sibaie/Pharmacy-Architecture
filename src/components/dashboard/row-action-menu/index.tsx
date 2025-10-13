'use client';
import React from 'react';
import Link from 'next/link';
import { Menu, MenuItem } from '@mui/material';
import { Eye, PencilSimple } from '@phosphor-icons/react';


interface RowActionMenuProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  handleMenuClose: () => void;
  handleOpen?: () => void;
  href?: string;
  actions: Array<'Edit' | 'View' | string>;
  selectedRow?: any;
  target?: string;
}

export default function RowActionMenu({
  open,
  anchorEl,
  handleMenuClose,
  handleOpen,
  href,
  actions,
  target = '_self',
}: RowActionMenuProps) {
  const renderAction = (action: string) => {
    switch (action) {
      case 'Edit':
        return (
          <MenuItem
            key="edit"
            onClick={() => {
              handleOpen && handleOpen();
              handleMenuClose();
            }}
          >
            <PencilSimple size={18} style={{ marginRight: 8 }} />
            Edit
          </MenuItem>
        );
      case 'View':
        return (
          <MenuItem key="view" component={Link} href={href || '#'} target={target}>
            <Eye size={18} style={{ marginRight: 8 }} />
            View
          </MenuItem>
        );

      default:
        return (
          <MenuItem key={action} onClick={handleMenuClose}>
            {action}
          </MenuItem>
        );
    }
  };

  return (
    <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
      {actions.map((action) => renderAction(action))}
    </Menu>
  );
}
