import * as React from 'react';
import {
  Box,
  Card,
  CardHeader,
  Collapse,
  Divider,
  IconButton,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { SxProps } from '@mui/material/styles';
import { CaretDown, CaretUp } from '@phosphor-icons/react';
import { TablePagination } from './pagination';

export interface CollapsibleColumn<T> {
  id: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
  width?: number;
}

export interface CollapsibleDataTableProps<T> {
  title?: string;
  columns: CollapsibleColumn<T>[];
  rows: T[];
  sx?: SxProps;
  renderCollapse: (row: T) => React.ReactNode;
  actions?: React.ReactNode;
  minWidth?: number;
  fallbackText?: string;
  loading: Boolean;
  page: number;
  rowsPerPage: number;
  onPageChange: (newPage: number) => void;
  onRowsPerPageChange: (rowsPerPage: number) => void;
  showFilter?: boolean;
  height?: string;
  showFilterTableHeight?: string;
  isShowPagination?: boolean;
  paginationRecords?: any;
}

type Order = 'asc' | 'desc' | null;

/** helper to safely get nested values (supports 'a.b.c' paths too) */
function getValue(obj: any, path: string) {
  if (!obj) return undefined;
  if (!path) return undefined;
  if (path.indexOf('.') === -1) return (obj as any)[path];
  return path.split('.').reduce((acc, key) => (acc ? acc[key] : undefined), obj);
}

export function CollapsibleDataTable<T>({
  title,
  columns,
  rows,
  sx,
  renderCollapse,
  fallbackText = '-',
  loading = false,
  page,
  rowsPerPage,
  onPageChange,
  onRowsPerPageChange,
  showFilterTableHeight = 'calc(100vh - 320px)',
  showFilter,
  height = 'calc(100vh - 170px)',
  isShowPagination = true,
  paginationRecords,
}: CollapsibleDataTableProps<T>): React.JSX.Element {
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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // keep track of which original index are open (stable across sorting/paging)
  const [openRows, setOpenRows] = React.useState<Record<number, boolean>>({});

  // three-state sorting
  const [order, setOrder] = React.useState<Order>(null);
  const [orderBy, setOrderBy] = React.useState<string | null>(null);

  // keep rows with their original index so we can restore original order reliably
  const indexedRows = React.useMemo(() => rows?.map((r, i) => ({ row: r, originalIndex: i })), [rows]);

  // column widths state
  const [columnWidths, setColumnWidths] = React.useState<Record<string, number>>(() =>
    columns.reduce(
      (acc, c) => {
        acc[String(c.id)] = c.width ?? 150; // default width 150px
        return acc;
      },
      {} as Record<string, number>
    )
  );

  const toggleRow = (originalIndex: number) => {
    setOpenRows((prev) => ({ ...prev, [originalIndex]: !prev[originalIndex] }));
  };

  const handleRequestSort = (property: string) => {
    // new column -> start with asc
    if (orderBy !== property) {
      setOrder('asc');
      setOrderBy(property);
      return;
    }

    // same column -> cycle asc -> desc -> null (reset)
    if (order === 'asc') {
      setOrder('desc');
    } else if (order === 'desc') {
      setOrder(null);
      setOrderBy(null);
    } else {
      setOrder('asc');
    }
  };

  // resizing logic
  const handleMouseDown = (e: React.MouseEvent, colId: string) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = columnWidths[colId];

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = Math.max(60, startWidth + (moveEvent.clientX - startX)); // min 60px
      setColumnWidths((prev) => ({ ...prev, [colId]: newWidth }));
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const processedIndexedRows = React.useMemo(() => {
    const copy = [...indexedRows];

    if (order && orderBy) {
      copy.sort((a, b) => {
        const aVal = getValue(a.row, orderBy);
        const bVal = getValue(b.row, orderBy);

        const aMissing = aVal === null || aVal === undefined;
        const bMissing = bVal === null || bVal === undefined;
        if (aMissing && bMissing) return 0;
        if (aMissing) return 1;
        if (bMissing) return -1;

        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return order === 'desc' ? bVal - aVal : aVal - bVal;
        }

        if (aVal instanceof Date && bVal instanceof Date) {
          return order === 'desc' ? bVal.getTime() - aVal.getTime() : aVal.getTime() - bVal.getTime();
        }

        const aStr = String(aVal).toLowerCase();
        const bStr = String(bVal).toLowerCase();
        if (aStr < bStr) return order === 'desc' ? 1 : -1;
        if (aStr > bStr) return order === 'desc' ? -1 : 1;
        return 0;
      });
    }

    return copy;
  }, [indexedRows, order, orderBy]);

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

          {/* <TableHead
              sx={{
                backgroundColor: '#E0E0E0',
                zIndex: 999,
                '& th': {
                  py: 2.5,
                },
              }}
            >
              <TableRow>
                <TableCell sx={{ width: 48 }} />
                {columns.map((c) => (
                  <TableCell key={c.id} width={c.width} sx={{ fontWeight: 'bold' }}>
                    <Box display={'flex'} justifyContent={'start'}>
                      {c.label}
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead> */}
         
            <TableHead
              sx={{
                zIndex: 9999,
                '& th': {
                  height:"56px"
                },
              }}
            >
              <TableRow>
                <TableCell sx={{ width: 48 }} />
                {columns.map((c) => {
                  const colId = String(c.id);
                  const isActive = orderBy === colId;
                  return (
                    <TableCell
                      key={colId}
                      style={{ width: columnWidths[colId] }}
                    >
                      <Box display="flex" justifyContent="start" alignItems="center">
                        <TableSortLabel
                          active={isActive}
                          direction={isActive ? order ?? 'asc' : 'asc'}
                          onClick={() => handleRequestSort(colId)}
                          sx={{ cursor: 'pointer', color:"#212636",  flexGrow: 1  }}
                        >
                          {c.label}
                        </TableSortLabel>
                      </Box>
                      <Box
                        onMouseDown={(e) => handleMouseDown(e, colId)}
                        sx={{
                          height: '100%',
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center',
                          position: 'absolute',
                          right: 0,
                          top: 0,
                          marginRight: "5px"
                        }}
                      >
                        <Box
                          sx={{
                            maxHeight: '26px',
                            minHeight: '26px',
                            width: '1.5px',
                            cursor: 'col-resize',
                            zIndex: 1,
                            bgcolor: '#dcdfe4',
                            transition: 'width 0.2s ease-in-out',
                            '&:hover': {
                              width: '4px',
                              backgroundColor:"#a19236"
                            },
                          }}
                        />
                      </Box>
                    </TableCell>
                  );
                })}
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
                      <TableCell>
                        <Skeleton variant="circular" width={20} height={20} />
                      </TableCell>
                      {columns.map((col) => (
                        <TableCell key={String(col.id)} style={{ width: columnWidths[String(col.id)] }}>
                          <Skeleton variant="text" width="80%" />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                : processedIndexedRows.map(({ row, originalIndex }, visibleIndex) => (
                    <React.Fragment key={originalIndex}>
                      <TableRow
                        sx={{
                          backgroundColor: visibleIndex % 2 === 0 ? '#fff' : '#f9fafb',
                          '&:hover': {
                            backgroundColor: '#f4f4ff',
                          },
                        }}
                      >
                        <TableCell sx={{ p: 1 }}>
                          <IconButton
                            size="small"
                            onClick={() => toggleRow(originalIndex)}
                            aria-label={openRows[originalIndex] ? 'Collapse' : 'Expand'}
                          >
                            {openRows[originalIndex] ? (
                              <CaretUp size={18} weight="bold" />
                            ) : (
                              <CaretDown size={18} weight="bold" />
                            )}
                          </IconButton>
                        </TableCell>

                        {columns.map((col) => (
                          <TableCell key={String(col.id)} sx={{ p: 1 }} style={{ width: columnWidths[String(col.id)] }}>
                            {col.render
                              ? (() => {
                                  const value = col.render(row);
                                  return value !== null && value !== undefined && value !== '' ? value : fallbackText;
                                })()
                              : (() => {
                                  const val = getValue(row as any, String(col.id));
                                  return val !== null && val !== undefined && val !== '' ? String(val) : fallbackText;
                                })()}
                          </TableCell>
                        ))}
                      </TableRow>

                      <TableRow>
                        <TableCell colSpan={columns.length + 1} sx={{ p: 0, borderBottom: 0 }}>
                          <Collapse in={!!openRows[originalIndex]} timeout="auto" unmountOnExit>
                            <Box sx={{ m: 2 }}>{renderCollapse(row)}</Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
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
          totalRecords={paginationTable?.totalRecords}
          totalPages={paginationTable?.totalPages}
        />
      )}
    </Card>
  );
}
