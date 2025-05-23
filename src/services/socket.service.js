import { io } from "socket.io-client";

const BASE_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5001";

export const socket = io(BASE_URL, {
  autoConnect: false,
});

// Connect to server and join room
export function connectSocket(sessionId, username, role) {
  socket.connect();
  socket.emit("join-session", { sessionId, username, role });
}

// Listen for user list updates
export function onUserListUpdate(callback) {
  socket.on("session-users-updated", callback);
}

// Admin loads a song
export function emitLoadSong(sessionId, song) {
  socket.emit("load-song", { sessionId, song });
}

// Emits a "start-countdown" event to the server
export function emitStartCountdown(sessionId) {
  socket.emit("start-countdown", { sessionId });
}

// Listen for the "countdown-started" event from the server
export function onCountdownStarted(callback) {
  socket.on("countdown-started", callback);
}

// listen for song updates
export function onSongUpdate(callback) {
  socket.on("song-updated", callback);
}

// Emits a "session-ended" event to the server
export function emitEndSession(sessionId) {
  socket.emit("end-session", { sessionId });
}

// Listen for the "session-ended" event from the server
export function onSessionEnded(callback) {
  socket.on("session-ended", callback);
}

//disconnect from the server
export function disconnectSocket() {
  socket.disconnect();
}
