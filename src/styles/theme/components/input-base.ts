import type { Components, Theme } from '@mui/material/styles';

export const MuiInputBase: Components<Theme>['MuiInputBase'] = {
  styleOverrides: {
    root: {
      height: 50,
      minHeight: 50,
      boxSizing: 'border-box',
    },
    input: {
      height: '100%',
      padding: '8px 12px',
      boxSizing: 'border-box',
    },
  },
};
