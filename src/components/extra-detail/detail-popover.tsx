'use client';

import * as React from 'react';
import { Popover, Typography } from '@mui/material';


interface PopoverProps {
  open: boolean;
  anchorEl: HTMLElement | null;
  onClose: () => void;
  selectedInformation: any;
}

export default function ExtraPopover({ open, anchorEl, onClose, selectedInformation }: PopoverProps) {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      PaperProps={{
        sx: {
          maxWidth: 320,
          p: 1.5,
          bgcolor: '#fff',
          border: '1px solid #f4f4ff',
          borderRadius: 2,
          boxShadow: 3,
        },
      }}
    >
      <Typography variant="body2" sx={{ fontSize: 12, display: 'flex' }}>
        <Typography sx={{ fontSize: 12, minWidth: 90, fontWeight: 600 }}>Date Created:</Typography> 1/1/2025
      </Typography>

      <Typography variant="body2" sx={{ fontSize: 12, display: 'flex' }}>
        <Typography sx={{ fontSize: 12, minWidth: 90, fontWeight: 600 }}>Modified At:</Typography> 1/1/2025
      </Typography>
    </Popover>
  );
}
