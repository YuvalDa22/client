import axios from 'axios';
const API = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export async function fetchSongs(search = '') {
  const res = await axios.get(`${API}/song?search=${search}`);
  return res.data;
}

export async function fetchSongById(id) {
  const res = await axios.get(`${API}/song/${id}`);
  return res.data;
}
