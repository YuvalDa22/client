import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'https://localhost:5001/api/session';

export async function createSession(userData){
    return await axios.post(`${BASE_URL}/create`, userData)
}

export async function joinSession(sessionId, userData){
    return await axios.post(`${BASE_URL}/join/${sessionId}`, userData)
}
