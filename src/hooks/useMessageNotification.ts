'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

import { ConversationList } from '@/types/message';
import { useSocket } from '@/hooks/use-socket';

export function useMessageNotification() {
  const socket = useSocket();
  const pathname = usePathname();

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<ConversationList | null>(null);

  useEffect(() => {
    const handler = (newMessage: ConversationList) => {
      // If we are on the messages route, skip showing toast
      if (pathname.startsWith('/messages')) return;

      setSnackbarMessage(newMessage);
      setSnackbarOpen(true);
    };

    if(socket) socket.on('conversation_updated', handler);
    return () => {
      if(socket) socket.off('conversation_updated', handler);
    };
  }, [pathname, socket]);

  return { snackbarOpen, setSnackbarOpen, snackbarMessage };
}
