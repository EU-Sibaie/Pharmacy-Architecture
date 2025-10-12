'use client';

import * as React from 'react';
import { Stack, Typography } from '@mui/material';

export default function Page() {
  return (
    <Stack spacing={1.5} height={"86vh"}>
      <Stack spacing={1}>
        <Stack direction={{ xs: 'row', sm: 'row' }} justifyContent="space-between" alignItems="center">
          <Typography variant="h5" fontWeight={'bold'}>
            Clients
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}
