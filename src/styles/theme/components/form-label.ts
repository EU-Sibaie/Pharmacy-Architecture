import type { Components, Theme } from '@mui/material/styles';

export const MuiFormLabel: Components<Theme>['MuiFormLabel'] = {
  styleOverrides: {
    root: {
      transform: 'translate(14px, 12px) scale(1)',
      transition: 'all 0.2s ease',
      '&.MuiInputLabel-shrink': {
        transform: 'translate(14px, -9px) scale(0.75)',
      },
    },
  },
};
