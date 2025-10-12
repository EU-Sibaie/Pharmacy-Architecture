import * as React from 'react';
import { formatWithCommas } from '@/helper/general';
import { getEstimates } from '@/services/estimates';
import { Box, Chip, IconButton, Popover, Typography } from '@mui/material';
import { CheckCircle, Clock, Info, PaperPlane, XCircle } from '@phosphor-icons/react';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

import { ApiResponseEstimate } from '@/types/estimate';
import { CollapsibleDataTable } from '@/components/core/collapsible-datatable';

const Estimates = ({ showDetail, id }: { showDetail: boolean; id: string }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [reasonAnchorEl, setReasonAnchorEl] = React.useState<HTMLElement | null>(null);
  const [selectedReason, setSelectedReason] = React.useState('');

  const openReason = Boolean(reasonAnchorEl);

  const { data: estimatesDetailData, isLoading } = useQuery<ApiResponseEstimate>({
    queryKey: ['estimates-detail', page, rowsPerPage],
    queryFn: async () => (await getEstimates({ page, rowsPerPage })).data,
  });

  const handleReasonClick = (event: React.MouseEvent<HTMLElement>, reason: string) => {
    setSelectedReason(reason);
    setReasonAnchorEl(event.currentTarget);
  };

  const handleReasonClose = () => {
    setReasonAnchorEl(null);
    setSelectedReason('');
  };

  return (
    <>
      <CollapsibleDataTable
        rows={estimatesDetailData?.data ?? []}
        loading={isLoading}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={setPage}
        onRowsPerPageChange={setRowsPerPage}
        minWidth={800}
        height={showDetail ? 'calc(100vh - 340px)' : 'calc(100vh - 210px)'}
        columns={[
          {
            id: 'estimateNo',
            label: 'Estimate No',
            width: 150,
            render: (row) => (
              <Box display={'flex'} justifyContent={'start'}>
                {row.estimateNo}
              </Box>
            ),
          },
          {
            id: 'contact',
            label: 'Contact',
            width: 150,
            render: (row) => (
              <Box display={'flex'} justifyContent={'start'}>
                {row.contact?.firstName ?? '-'}
              </Box>
            ),
          },
          {
            id: 'company',
            label: 'Company',
            width: 200,
            render: (row) => (
              <Box display={'flex'} justifyContent={'start'}>
                {row.company?.name ?? '-'}
              </Box>
            ),
          },
          {
            id: 'estimationDate',
            label: 'Estimation Date',
            width: 200,
            render: (row) => (
              <Box display={'flex'} justifyContent={'start'}>
                {dayjs(row.estimationDate).format('MMM D, YYYY') ?? '-'}
              </Box>
            ),
          },
          {
            id: 'totalAmount',
            label: 'Total Amount',
            width: 150,
            render: (row) => (
              <Box display={'flex'} justifyContent={'end'}>{`$ ${formatWithCommas(row?.totalAmount)}`}</Box>
            ),
          },

          {
            id: 'status',
            label: 'Status',
            width: 180,
            render: (row) => {
              const statusMap: Record<
                string,
                {
                  label: string;
                  color: 'default' | 'success' | 'error' | 'warning' | 'info';
                  icon: React.ReactNode;
                  bg: string;
                  textColor: string;
                }
              > = {
                pending: {
                  label: 'Pending',
                  color: 'warning',
                  icon: <Clock size={14} />,
                  bg: '#fff7e6',
                  textColor: '#b26a00',
                },
                sent: {
                  label: 'Sent',
                  color: 'info',
                  icon: <PaperPlane size={14} />,
                  bg: '#e6f4ff',
                  textColor: '#005999',
                },
                accepted: {
                  label: 'Accepted',
                  color: 'success',
                  icon: <CheckCircle size={14} />,
                  bg: '#e6ffed',
                  textColor: '#027a48',
                },
                rejected: {
                  label: 'Rejected',
                  color: 'error',
                  icon: <XCircle size={14} />,
                  bg: '#ffe6e6',
                  textColor: '#d92d20',
                },
              };

              const statusInfo = statusMap[row.status as string] || {
                label: 'Unknown',
                color: 'default',
                icon: null,
                bg: '#f0f0f0',
                textColor: '#666',
              };

              return (
                <Box display="flex" alignItems="center">
                  <Chip
                    icon={React.isValidElement(statusInfo.icon) ? statusInfo.icon : undefined}
                    label={statusInfo.label}
                    size="small"
                    sx={{
                      px: 1.5,
                      py: 0.25,
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      width: 140,
                      borderRadius: '12px',
                      backgroundColor: statusInfo.bg,
                      color: statusInfo.textColor,
                      '.MuiChip-icon': {
                        color: statusInfo.textColor,
                        marginLeft: '4px',
                        marginRight: '-4px',
                      },
                    }}
                  />
                  {row.status === 'rejected' && row.rejectionReason && (
                    <IconButton
                      size="small"
                      onClick={(e) => handleReasonClick(e, row?.rejectionReason || '')}
                      sx={{
                        bgcolor: '#fdeaea',
                        color: '#f04438',
                        '&:hover': {
                          bgcolor: '#facdcd',
                          transform: 'scale(1.1)',
                        },
                        ml: 1,
                        transition: 'transform 0.2s ease',
                      }}
                      aria-label="View rejection reason"
                    >
                      <Info weight="bold" size={16} />
                    </IconButton>
                  )}
                </Box>
              );
            },
          },
        ]}
        paginationRecords={estimatesDetailData}
      />
      <Popover
        open={openReason}
        anchorEl={reasonAnchorEl}
        onClose={handleReasonClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        PaperProps={{
          sx: {
            maxWidth: 320,
            p: 2,
            bgcolor: '#fff',
            border: '1px solid #f04438',
            borderRadius: 2,
            boxShadow: 3,
          },
        }}
      >
        <Typography variant="subtitle2" sx={{ color: '#f04438', mb: 1 }}>
          Rejection Reason
        </Typography>
        <Typography variant="body2" sx={{ whiteSpace: 'pre-line' }}>
          {selectedReason}
        </Typography>
      </Popover>
    </>
  );
};

export default Estimates;
