import axios from 'axios';

const API = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export const createSession = (data) => axios.post(`${API}/session/create`, data);

export const joinSession = (sessionId, data) => axios.put(`${API}/session/${sessionId}/join`, data);
