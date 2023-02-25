import io from 'socket.io-client';

let socket;

export const getSocket = () => {
    if (!socket) {
        socket = io('192.168.100.5:11202');
    }

    return socket;
};
