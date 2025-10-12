'use client';

import * as React from 'react';
import { badgeProjectStatuses } from '@/constant/job';
import { formatWithCommas } from '@/helper/general';
import { getEmployees } from '@/services/employee';
import { getJobs } from '@/services/jobs';
import { Box, Chip, IconButton } from '@mui/material';
import { Info } from '@phosphor-icons/react';
import { useQuery } from '@tanstack/react-query';
import { ApiResponseProject, Project } from '@/types/company';
import { Employee } from '@/types/employee';
import { GenericTable } from '@/components/core/genericTable';
import ExtraPopover from '@/components/extra-detail/detail-popover';

const Jobs = ({ showDetail, id }: { showDetail: boolean; id: string }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rowAnchorEl, setRowAnchorEl] = React.useState<HTMLElement | null>(null);
  const [selectedInformation, setSelectedInformation] = React.useState<Project | null>(null);

const { data: jobsTableData , isLoading } = useQuery<ApiResponseProject>({
    queryKey: ['jobs', page, rowsPerPage],
    queryFn: async () => (await getJobs({ contact: id, page, rowsPerPage })).data as ApiResponseProject,
  });

  const { data: employeesList = [] } = useQuery<Employee[]>({
    queryKey: ['employees-list'],
    queryFn: async () => (await getEmployees({ all: true })).data.data as Employee[],
  });

  const openReason = Boolean(rowAnchorEl);

  const handleInformation = (event: React.MouseEvent<HTMLElement>, row: Project) => {
    setSelectedInformation(row);
    setRowAnchorEl(event.currentTarget);
  };

  const handleReasonClose = () => {
    setRowAnchorEl(null);
    setSelectedInformation(null);
  };

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      flex: 1,
      minWidth: 50,
      renderCell: (params: any) => params.row.id,
      show: true,
      order: 0,
    },
    {
      field: 'projectName',
      headerName: 'Name',
      flex: 1,
      minWidth: 200,
      renderCell: (params: any) => (
        <Box display="flex" justifyContent="start">
          {params.row.projectName}
        </Box>
      ),
      show: true,
      order: 1, // updated (was 0)
    },
    {
      field: 'type',
      headerName: 'Type',
      flex: 1,
      minWidth: 120,
      renderCell: (params: any) => (
        <Box display="flex" justifyContent="start">
          {params.row.type}
        </Box>
      ),
      show: true,
      order: 2,
    },
    {
      field: 'status',
      headerName: 'Status',
      minWidth: 140,
      renderCell: (params: any) => {
        const status = badgeProjectStatuses.find((s) => s.label === params.row.status || s.value === params.row.status);
        if (!status) return params.row.status;
        return (
          <Chip
            label={status.label}
            size="small"
            sx={{
              width: 140,
              backgroundColor: status.bgColor,
              color: status.textColor,
              fontWeight: 600,
              borderRadius: '12px',
              fontSize: '0.75rem',
              px: 1.5,
              py: 0.25,
            }}
          />
        );
      },
      show: true,
      order: 3,
    },
    {
      field: 'estimatedCost',
      headerName: 'Est. Cost',
      flex: 1,
      minWidth: 120,
      renderCell: (params: any) => (
        <Box display="flex" justifyContent="start">
          $ {formatWithCommas(String(params.row.estimatedCost))}
        </Box>
      ),
      show: true,
      order: 4,
    },
    {
      field: 'employees',
      headerName: 'Employees',
      flex: 1,
      minWidth: 200,
      renderCell: (params: any) => {
        const names = params.row.employeeIds
          .map((id: any) => {
            const emp = employeesList.find((e) => e.id.toString() === id);
            return emp ? emp.firstName : null;
          })
          .filter(Boolean);

        if (!names.length) return 'No Employees Assigned';

        const visibleNames = names.slice(0, 5);
        const remainingCount = names.length - visibleNames.length;
        return (
          <Box display="flex" justifyContent="start">
            {remainingCount > 0 ? `${visibleNames.join(', ')} ....` : visibleNames.join(', ')}
          </Box>
        );
      },
      show: true,
      order: 5,
    },
    {
      field: 'contact',
      headerName: 'Contact',
      minWidth: 100,
      renderCell: (params: any) => params.row.contact?.firstName,
      show: true,
      order: 6,
    },
    {
      field: 'company',
      headerName: 'Company',
      minWidth: 100,
      renderCell: (params: any) => params.row.company?.name,
      show: true,
      order: 7,
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

  return (
    <>
      <GenericTable
        rows={jobsTableData?.data}
        columns={columns.filter((col: any) => col.show !== false)}
        loading={isLoading}
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={setPage}
        onRowsPerPageChange={setRowsPerPage}
        showFilter={false}
        height={showDetail ? 'calc(100vh - 340px)' : 'calc(100vh - 210px)'}
        paginationRecords={jobsTableData}
      />

      <ExtraPopover
        open={openReason}
        anchorEl={rowAnchorEl}
        onClose={handleReasonClose}
        selectedInformation={selectedInformation}
      />
    </>
  );
};

export default Jobs;
