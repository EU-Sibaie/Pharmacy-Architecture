// import { io, Socket } from 'socket.io-client';

// let socket: Socket | null = null;

// export const getSocket = (): Socket => {
//   if (!socket) {
//     socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:4000', {
//       auth: { token: localStorage.getItem('token') },
//     });
//   } else {
//     console.log('[socket] Returning existing socket instance');
//   }

//   return socket;
// };

import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const getSocket = (): Socket | null => {
  if (typeof window === 'undefined') {
    return null;
  }

  if (!socket) {
    const token = localStorage.getItem('token');
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:4000', {
      auth: { token },
    });
  } else {
    console.log('[socket] Returning existing socket instance');
  }

  return socket;
};
