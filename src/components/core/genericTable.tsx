import * as React from 'react';
import { Card, SxProps, useMediaQuery, useTheme } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

export interface GenericTableProps<T> {
  rows: any;
  columns: GridColDef[];
  loading?: boolean;
  page?: number;
  rowsPerPage?: number;
  onPageChange?: (newPage: number) => void;
  onRowsPerPageChange?: (newSize: number) => void;
  isShowPagination?: boolean;
  showFilter?: boolean;
  showFilterTableHeight?: string;
  height?: string;
  paginationRecords?: any;
  sx?: SxProps;
}

export function GenericTable<T>({
  rows,
  columns,
  loading = false,
  page = 0,
  rowsPerPage = 10,
  onPageChange,
  onRowsPerPageChange,
  isShowPagination = true,
  showFilter,
  height = 'calc(100vh - 170px)',
  showFilterTableHeight = 'calc(100vh - 320px)',
  sx,
  paginationRecords,
}: GenericTableProps<T>) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [paginationTable, setPaginationTable] = React.useState<{
    totalRecords: number;
    totalPages: number;
  }>({
    totalRecords: 0,
    totalPages: 0,
  });

  React.useEffect(() => {
    if (rows?.length > 0) {
      setPaginationTable({
        totalRecords: paginationRecords?.total ?? 0,
        totalPages: paginationRecords?.totalPages ?? 0,
      });
    }
  }, [rows, paginationRecords]);

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: isMobile ? 'calc(100vh - 200px)' : showFilter ? showFilterTableHeight : height,
        ...sx,
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        disableColumnMenu
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        hideFooter
        disableRowSelectionOnClick
        sx={{
          px: 0.5,
          '& .MuiDataGrid-row:nth-of-type(odd)': {
            backgroundColor: '#f9fafb',
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: '#f4f4ff',
          },
        }}
      />
      {/* {isShowPagination && (
        <TablePagination
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(val) => {
            onPageChange && onPageChange(val);
          }}
          onRowsPerPageChange={(val) => {
            onRowsPerPageChange && onRowsPerPageChange(val);
          }}
          totalRecords={paginationTable?.totalRecords}
          totalPages={paginationTable?.totalPages}
        />
      )} */}
    </Card>
  );
}

