import axios from "axios";
const API = import.meta.env.VITE_API_URL || "http://localhost:5001/api";

export async function fetchSongs(search = "") {
  const res = await axios.get(`${API}/song?search=${search}`);
  return res.data;
}

export async function fetchSongById(id) {
  try {
    const res = await axios.get(`${API}/song/${id}`);
    return res.data; // data returned as JSON
  } catch (error) {
    console.error("Error fetching song:", error);
    return null;
  }
}