'use client';

import * as React from 'react';
import { TabContext, TabPanel } from '@mui/lab';
import { Box, Card, Collapse, Grid, Stack, Tab, Tabs, Typography } from '@mui/material';
import { Buildings, CaretDown, CaretUp, Clock, EnvelopeSimple, Phone, User } from '@phosphor-icons/react';
import dayjs from 'dayjs';

import { agents } from '../dummy';

const DetailPage = () => {
  const [value, setValue] = React.useState('agents');
  const [showDetail, setShowDetail] = React.useState(true);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Stack spacing={1} pb={2} height={"89vh"}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" fontWeight="bold" display={'flex'} alignItems={'center'} gap={1}>
          Detail{' '}
          {showDetail ? (
            <CaretDown style={{ cursor: 'pointer' }} onClick={() => setShowDetail(!showDetail)} />
          ) : (
            <CaretUp style={{ cursor: 'pointer' }} onClick={() => setShowDetail(!showDetail)} />
          )}
        </Typography>
      </Stack>

      <Collapse in={showDetail} timeout={600}>
        <Card
          sx={{
            p: 2,
            borderRadius: 2,
            boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
            bgcolor: '#fff',
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Stack direction="row" spacing={1} alignItems="start">
                <Box>
                  <Typography fontWeight="bold" fontSize={14}>
                    Name
                  </Typography>
                  <Typography fontSize={14}>{agents?.[0]?.call?.agent_name}</Typography>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Stack direction="row" spacing={1} alignItems="start">
                <Box>
                  <Typography fontWeight="bold" fontSize={14}>
                    From Number
                  </Typography>
                  <Typography fontSize={14}>{agents?.[0]?.call?.from_number}</Typography>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Stack direction="row" spacing={1} alignItems="start">
                <Box>
                  <Typography fontWeight="bold" fontSize={14}>
                    To Number
                  </Typography>
                  <Typography fontSize={14}>{agents?.[0]?.call?.to_number}</Typography>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Stack direction="row" spacing={1} alignItems="start">
                <Box>
                  <Typography fontWeight="bold" fontSize={14}>
                    Combine Cost
                  </Typography>
                  <Typography fontSize={14}>{agents?.[0]?.call?.call_cost?.combined_cost}</Typography>
                </Box>
              </Stack>
            </Grid>
            <Grid item xs={12} sm={12} md={12}>
              <Stack direction="row" spacing={1} alignItems="start">
                <Box>
                  <Typography fontWeight="bold" fontSize={14}>
                    Summary
                  </Typography>
                  <Typography fontSize={14}>{agents?.[0]?.call?.call_analysis?.call_summary}</Typography>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Card>
      </Collapse>

      <TabContext value={value}>
        <Card
          sx={{
            borderRadius: 2,
            boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
            bgcolor: '#fff',
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            sx={{
              px: 2,
              borderBottom: '1px solid #e5e7eb',
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 600,
                fontSize: 14,
              },
            }}
          >
            <Tab label="Agents" value="agents" />
            <Tab label="Clients" value="clients" />
          </Tabs>
        </Card>
        <TabPanel value="agents" sx={{ p: 0 }}></TabPanel>
        <TabPanel value="Clients" sx={{ p: 0 }}></TabPanel>
      </TabContext>
    </Stack>
  );
};

export default DetailPage;
