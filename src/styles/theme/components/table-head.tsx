import type { Components } from '@mui/material/styles';
import { tableCellClasses } from '@mui/material/TableCell';

import type { Theme } from '../types';

export const MuiTableHead = {
  styleOverrides: {
    root: {
      [`& .${tableCellClasses.root}`]: {
        color: 'var(--mui-palette-text-secondary)',
        lineHeight: 1,
      },
    },
  },
} satisfies Components<Theme>['MuiTableHead'];
