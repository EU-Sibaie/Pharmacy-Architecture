'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Alert, Snackbar, Typography } from '@mui/material';
import { Box } from '@mui/system';

import { ConversationList } from '@/types/message';
import { neonBlue } from '@/styles/theme/colors';

interface MessageSnackbarProps {
  open: boolean;
  onClose: () => void;
  message: ConversationList | null;
}

export function MessageSnackbar({ open, onClose, message }: MessageSnackbarProps) {
  const router = useRouter();

  useEffect(() => {
    const showNotification = () => {
      if (document.hidden && message) {
        new Notification('Test Notification', { body: 'Hello from background tab' });
      }
    };

    document.addEventListener('visibilitychange', showNotification);
    return () => document.removeEventListener('visibilitychange', showNotification);
  }, [open, message]);

  const handleAlertClick = () => {
    if (message?.id) {
      router.push(`/messages?conversationId=${message.id}`);
      onClose();
    }
  };

  return (
    <Snackbar
      open={open}
      onClose={onClose}
      autoHideDuration={5000}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      sx={{
        '& .MuiPaper-root': {
          borderRadius: '12px',
          minWidth: 250,
          maxWidth: 250,
          boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
        },
      }}
    >
      <Alert
        onClick={handleAlertClick}
        onClose={(e) => {
          e.stopPropagation();
          onClose();
        }}
        icon={false}
        sx={{
          alignItems: 'flex-start',
          px: 2,
          background: `linear-gradient(135deg, ${neonBlue[500]} 0%, ${neonBlue[600]} 100%)`,
          color: '#fff',
          borderRadius: '12px',
          cursor: 'pointer',
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 700, fontSize: '13px', mb: 0.5 }}>
          {message?.latestMessageType === 'system' ? 'Group Created' : 'New Message'}
        </Typography>
        <Box>
          {message?.latestMessageType === 'system' ? (
            <Typography
              variant="body2"
              sx={{
                opacity: 0.8,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                fontSize: '13px',
              }}
            >
              {message?.latestMessage}
            </Typography>
          ) : (
            <>
              <Typography
                variant="body2"
                sx={{ fontSize: '13px', fontWeight: 600, opacity: 0.9, pr: 0.5, minWidth: 50 }}
              >
                {message?.conversationName}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  opacity: 0.8,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  fontSize: '13px',
                }}
              >
                {message?.latestMessage ? message?.latestMessage : 'Received attachments.'}
              </Typography>
            </>
          )}
        </Box>
      </Alert>
    </Snackbar>
  );
}
