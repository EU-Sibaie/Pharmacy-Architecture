'use client';

import * as React from 'react';
import { Box, Divider, Pagination, Typography, useMediaQuery, useTheme } from '@mui/material';

interface TablePaginationProps {
  page: number;
  rowsPerPage: number;
  totalRecords: number;
  rowsPerPageOptions?: number[];
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (newRowsPerPage: number) => void;
  totalPages?: number;
}

export function TablePagination({
  page,
  rowsPerPage,
  totalRecords,
  rowsPerPageOptions = [10, 20, 30, 40, 50],
  onPageChange,
  onRowsPerPageChange,
  totalPages,
}: TablePaginationProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // or 'md'

  return (
    <>
      <Divider />
      <Box
        sx={{
          display: 'flex',
          justifyContent: { sm: 'space-between', xs: 'center' },
          alignItems: 'center',
          flexWrap: 'wrap',
          px: 2,
          py: 1.5,
          borderTop: '1px solid #e0e0e0',
          backgroundColor: '#fafafa',
          borderBottomLeftRadius: 12,
          borderBottomRightRadius: 12,
          rowGap: 2,
        }}
      >
        <Typography variant="body2" sx={{ display: { sm: 'block', xs: 'none' } }} color="text.secondary">
          Total Records: {totalRecords}
        </Typography>

        <Pagination
          page={page + 1}
          onChange={(e, value) => onPageChange(value - 1)}
          count={totalPages || 1}
          variant="outlined"
          color="primary"
          siblingCount={isMobile ? 1 : 1}
          boundaryCount={isMobile ? 0 : 1}
          showFirstButton={!isMobile}
          showLastButton={!isMobile}
        />

        <Box sx={{ display: { sm: 'flex', xs: 'none' }, alignItems: 'center', gap: 1 }}>
          <Box sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>Page Size:</Box>
          <select
            value={rowsPerPage}
            onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
            style={{
              border: 0,
              fontSize: '0.875rem',
              backgroundColor: '#fff',
              outline: 'none',
              height: 30,
              width: 60,
            }}
          >
            {rowsPerPageOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </Box>
      </Box>
    </>
  );
}
