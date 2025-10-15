'use client';

import * as React from 'react';
import { Box, IconButton, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { DotsThreeVertical, Info } from '@phosphor-icons/react';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { GenericTable } from '@/components/core/genericTable';
import RowActionMenu from '@/components/dashboard/row-action-menu';
import ExtraPopover from '@/components/extra-detail/detail-popover';
import CustomButton from '@/components/ui/customButton';

import { agents } from './dummy';

export default function Page() {
  const [rowAnchorEl, setRowAnchorEl] = React.useState<HTMLElement | null>(null);
  const [selectedInformation, setSelectedInformation] = React.useState<any>(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const [selectedRow, setSelectedRow] = React.useState<any>(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const openReason = Boolean(rowAnchorEl);

  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // const { data: contactsTableData, isLoading } = useQuery<ApiResponse>({
  //   queryKey: ['contacts', page, rowsPerPage],
  //   queryFn: async () => (await contactApi.getContacts({ page, rowsPerPage })).data as ApiResponse,
  // });

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, row: any) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleInformation = (event: React.MouseEvent<HTMLElement>, row: any) => {
    setSelectedInformation(row);
    setRowAnchorEl(event.currentTarget);
  };

  const columns = [
    {
      field: 'agent_id',
      headerName: 'Agent Id',
      flex: 1,
      minWidth: 50,
      renderCell: (params: any) => params?.row?.call?.agent_id,
      show: !isMobile,
      order: 0,
    },
    {
      field: 'agent_name',
      headerName: 'agent name',
      flex: 1,
      minWidth: 50,
      renderCell: (params: any) => params?.row?.call?.agent_name,
      show: !isMobile,
      order: 0,
    },
    {
      field: 'from_number',
      headerName: 'From Number',
      flex: 1,
      minWidth: 50,
      renderCell: (params: any) => params?.row?.call?.from_number,
      show: true,
      order: 0,
    },
    {
      field: 'to_number',
      headerName: 'To Number',
      flex: 1,
      minWidth: 50,
      renderCell: (params: any) => params?.row?.call?.to_number,
      show: true,
      order: 0,
    },
    {
      field: 'combined_cost',
      headerName: 'Combined Cost',
      flex: 1,
      minWidth: 50,
      renderCell: (params: any) => params?.row?.call?.call_cost?.combined_cost,
      show: !isMobile,
      order: 0,
    },
    {
      field: 'call_status',
      headerName: 'Call Status',
      flex: 1,
      minWidth: 50,
      renderCell: (params: any) => params?.row?.call?.call_status,
      show: !isMobile,
      order: 0,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 100,
      sortable: false,
      renderCell: (params: any) => {
        return (
          <Box>
            <IconButton onClick={(e) => handleMenuOpen(e, params.row)} size="small">
              <DotsThreeVertical size={22} weight="bold" />
            </IconButton>
          </Box>
        );
      },
      show: true,
      order: 5,
    },
    {
      field: 'Info',
      headerName: 'Info',
      width: 80,
      sortable: false,
      renderCell: (params: any) => (
        <IconButton onClick={(e) => handleInformation(e, params.row)} size="small">
          <Info weight="bold" size={16} />
        </IconButton>
      ),
      show: true,
      order: 6,
    },
  ];

  const handleReasonClose = () => {
    setRowAnchorEl(null);
    setSelectedInformation(null);
  };

  return (
    <Stack spacing={1.5}>
      <Stack spacing={1}>
        <Stack direction={{ xs: 'row', sm: 'row' }} justifyContent="space-between" alignItems="center">
          <Typography variant="h5" fontWeight={'bold'}>
            Agents
          </Typography>
          <Box gap={2} display={'flex'}>
            <CustomButton sx={{ sm: 'none', xs: 'block' }} startIcon={<PlusIcon />} label="Add Agent" />
          </Box>
        </Stack>
      </Stack>

      <GenericTable
        rows={agents}
        columns={columns.filter((col: any) => col.show !== false)}
        loading={false}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={setPage}
        onRowsPerPageChange={setRowsPerPage}
      />

      <ExtraPopover
        open={openReason}
        anchorEl={rowAnchorEl}
        onClose={handleReasonClose}
        selectedInformation={selectedInformation}
      />

      <RowActionMenu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        handleMenuClose={handleMenuClose}
        href={`/agents/${selectedRow?.id}`}
        actions={['View']}
      />
    </Stack>
  );
}
