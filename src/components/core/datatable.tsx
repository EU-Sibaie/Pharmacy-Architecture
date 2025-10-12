import * as React from 'react';
import {
  Box,
  Card,
  CardHeader,
  Divider,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { SxProps } from '@mui/material/styles';
import { TablePagination } from './pagination';

export interface Column<T> {
  id: string;
  label: string;
  render?: (row: T) => React.ReactNode;
  width?: number;
}

export interface DataTableProps<T> {
  title?: string;
  columns: Column<T>[];
  rows: T[];
  sx?: SxProps;
  onRowClick?: (row: T) => void;
  actions?: React.ReactNode;
  minWidth?: number;
  fallbackText?: string;
  loading?: boolean;
  height?: string;
  page?: number;
  rowsPerPage?: number;
  onPageChange?: (newPage: number) => void;
  onRowsPerPageChange?: (rowsPerPage: number) => void;
  isShowPagination?: boolean;
  showFilter?: boolean;
  showFilterTableHeight?: string;
}

export function DataTable<T>({
  title,
  columns,
  rows,
  sx,
  onRowClick,
  fallbackText = '-',
  loading = false,
  height = 'calc(100vh - 170px)',
  showFilterTableHeight = 'calc(100vh - 320px)',
  page = 0,
  rowsPerPage = 10,
  onPageChange,
  onRowsPerPageChange,
  isShowPagination = true,
  showFilter,
}: DataTableProps<T>): React.JSX.Element {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: isMobile ? 'calc(100vh - 200px)' : showFilter ? showFilterTableHeight : height,
        ...sx,
      }}
    >
      {title && <CardHeader title={title} />}
      {title && <Divider />}

      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        <Box sx={{ height: '100%', overflow: 'auto' }}>
          <Table stickyHeader sx={{ minWidth: 800 }}>
            <TableHead
              sx={{
                backgroundColor: '#E0E0E0',
                zIndex: 999,
                '& th': {
                  py: 2.5,
                  fontWeight: 'bold',
                },
              }}
            >
              <TableRow>
                {columns.map((col) => (
                  <TableCell key={col.id} width={col.width}>
                    <Box display={'flex'} justifyContent={'start'}>
                      {col.label}
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {loading
                ? [...Array(8)].map((_, i) => (
                    <TableRow
                      key={`skeleton-${i}`}
                      sx={{
                        height: 40,
                        backgroundColor: i % 2 === 0 ? '#FFFFFF' : '#f9fafb',
                      }}
                    >
                      {columns.map((col) => (
                        <TableCell key={col.id}>
                          <Skeleton variant="text" width="80%" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : rows.map((row, rowIndex) => (
                    <TableRow
                      key={rowIndex}
                      onClick={onRowClick ? () => onRowClick(row) : undefined}
                      sx={{
                        backgroundColor: rowIndex % 2 === 0 ? '#fff' : '#f9fafb',
                        '&:hover': {
                          backgroundColor: '#f4f4ff',
                        },
                        ...(onRowClick ? { cursor: 'pointer' } : {}),
                      }}
                    >
                      {columns.map((col) => (
                        <TableCell key={col.id} sx={{ p: 1 }}>
                          {col.render
                            ? (() => {
                                const value = col.render(row);
                                return value !== null && value !== undefined && value !== '' ? value : fallbackText;
                              })()
                            : (row as any)[col.id] !== null &&
                                (row as any)[col.id] !== undefined &&
                                (row as any)[col.id] !== ''
                              ? (row as any)[col.id]
                              : fallbackText}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </Box>
      </Box>

      {isShowPagination && (
        <TablePagination
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={(val) => {
            onPageChange && onPageChange(val);
          }}
          onRowsPerPageChange={(val) => {
            onRowsPerPageChange && onRowsPerPageChange(val);
          }}
          totalRecords={rows?.length}
        />
      )}
    </Card>
  );
}
