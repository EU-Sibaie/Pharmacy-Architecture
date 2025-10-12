'use client';

import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

interface AddButtonProps extends ButtonProps {
  label: string;
  startIcon?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  loading?: boolean;
  disabled?: boolean
  extraStyle?: object
}

const CustomButton: React.FC<AddButtonProps> = ({
  label = '',
  startIcon,
  variant = 'contained',
  color = 'primary',
  type = 'button',
  loading,
  disabled,
  sx,
  extraStyle,
  ...props
}) => {
  return (
    <Button
      startIcon={startIcon}
      variant={variant}
      color={color}
      type={type}
      disabled={loading || disabled}
      sx={{
        ...extraStyle,
        borderRadius: '12px',
        textTransform: 'none',
        fontWeight: 600,
        px:  { xs: 1.5, sm: 2.5 },
        py: { xs: 0.8, sm: 1 },
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.15)',
          transform: 'translateY(-1px)',
        },
        ...sx,
      }}
      {...props}
    >
      {loading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : label}
    </Button>
  );
};

export default CustomButton;
