import { useEffect, useMemo } from 'react';
import { getSocket } from '@/lib/socket';

export const useSocket = () => {
  const socket = useMemo(() => {
    console.log('[useSocket] Getting socket instance');
    return getSocket();
  }, []);

  useEffect(() => {
    if (socket) {
      if (!socket.connected) {
        console.log('[useSocket] Connecting socket...');
        socket.connect();
      }

      socket.on('connect', () => {
        console.log('[useSocket] Socket connected:', socket.id);
      });

      socket.on('disconnect', () => {
        console.log('[useSocket] Socket disconnected');
      });
    }
  }, [socket]);

  return socket;
};
