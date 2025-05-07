import { io } from 'socket.io-client';

const BASE_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

export const socket = io(BASE_URL, {
    autoConnect: false,
});

// Connect to server and join room
export function connectSocket(sessionId, username){
    socket.connect();
    socket.emit('join-session', { sessionId, username });
}

// Admin loads a song
export function emitLoadSong(sessionId, song){
    socket.emit('load-song', { sessionId, song });
}

// listen for song updates
export function onSongUpdate(callback){
    socket.on('song-updated', callback )
}

//disconnect from the server
export function disconnectSocket(){
    socket.disconnect();
}