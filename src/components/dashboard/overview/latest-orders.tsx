'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import type { SxProps } from '@mui/material/styles';
import { ArrowRight as ArrowRightIcon } from '@phosphor-icons/react/dist/ssr/ArrowRight';
import dayjs from 'dayjs';

import { DataTable } from '@/components/core/datatable';

const statusMap = {
  pending: { label: 'Pending', color: 'warning' },
  delivered: { label: 'Delivered', color: 'success' },
  refunded: { label: 'Refunded', color: 'error' },
} as const;

export interface Order {
  id: string;
  customer: { name: string };
  amount: number;
  status: 'pending' | 'delivered' | 'refunded';
  createdAt: Date;
}

export interface LatestOrdersProps {
  orders?: Order[];
  sx?: SxProps;
}

export function LatestOrders({ orders = [], sx }: LatestOrdersProps): React.JSX.Element {
  const dummyOrders: Order[] = [
    {
      id: 'ORD-1001',
      customer: { name: 'Alice Johnson' },
      amount: 250,
      status: 'pending',
      createdAt: new Date('2024-09-01'),
    },
    {
      id: 'ORD-1002',
      customer: { name: 'Bob Smith' },
      amount: 400,
      status: 'delivered',
      createdAt: new Date('2024-09-03'),
    },
    {
      id: 'ORD-1003',
      customer: { name: 'Charlie Davis' },
      amount: 180,
      status: 'refunded',
      createdAt: new Date('2024-09-05'),
    },
    {
      id: 'ORD-1004',
      customer: { name: 'Dana Lee' },
      amount: 320,
      status: 'pending',
      createdAt: new Date('2024-09-07'),
    },
  ];

  return (
    <Card sx={sx}>
      <CardHeader title="Latest orders" />
      <Divider />
      <Box sx={{ overflowX: 'auto' }}>
        <DataTable
          isShowPagination={false}
          height="calc(100vh - 490px)"
          rows={dummyOrders}
          columns={[
            {
              id: 'id',
              label: 'Order',
              render: (row) => (
                <Box display={'flex'} justifyContent={'start'}>
                  {row.id}{' '}
                </Box>
              ),
            },
            {
              id: 'customer',
              label: 'Customer',
              render: (row) => (
                <Box display={'flex'} justifyContent={'start'}>
                  {row.customer.name}{' '}
                </Box>
              ),
            },
            {
              id: 'createdAt',
              label: 'Date',
              render: (row) => (
                <Box display={'flex'} justifyContent={'start'}>
                  {dayjs(row.createdAt).format('MMM D, YYYY')}{' '}
                </Box>
              ),
            },
            {
              id: 'status',
              label: 'Status',
              render: (row) => {
                const { label, color } = statusMap[row.status];
                return (
                  <Box display={'flex'} justifyContent={'start'}>
                    <Chip color={color} label={label} size="small" />
                  </Box>
                );
              },
            },
          ]}
          minWidth={800}
        />
        <Divider />
      </Box>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={<ArrowRightIcon fontSize="var(--icon-fontSize-md)" />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
}
