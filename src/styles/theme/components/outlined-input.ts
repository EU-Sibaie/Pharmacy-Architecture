import type { Components, Theme } from '@mui/material/styles';

export const MuiOutlinedInput: Components<Theme>['MuiOutlinedInput'] = {
  styleOverrides: {
    root: {
      height: 50,
      padding: '8px 12px',
      boxSizing: 'border-box',
    },
    input: {
      padding: '8px 12px',
      height: '100%',
      boxSizing: 'border-box',
    },
    notchedOutline: {
      top: 0,
    },
  },
};
