import { useState, useCallback, useEffect } from "react";
import { Input, Box, List, ListItem, Button, Heading } from "@chakra-ui/react";
import debounce from "lodash.debounce";
import { fetchSongs, fetchSongById } from "../services/song.service.js";
import { emitLoadSong } from "../services/socket.service.js";

function AdminSongPicker({ sessionId, onSongSelected }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Prevent memory leaks by canceling debounce on unmount
  useEffect(() => {
    return () => debounceSearch.cancel();
  }, []);

  const debounceSearch = useCallback(
    debounce(async (value) => {
      if (value.trim()) {
        const songs = await fetchSongs(value);
        setSuggestions(songs);
      } else {
        setSuggestions([]);
      }
    }, 300),
    []
  );

  async function handleSearchChange(e) {
    const value = e.target.value;
    setSearchTerm(value);
    debounceSearch(value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    const songs = await fetchSongs(searchTerm.trim());
    setSuggestions(songs);
  }

  async function handleSelect(song) {
    const fullSong = await fetchSongById(song.id);

    // If in session, emit to socket
    if (sessionId) {
      emitLoadSong(sessionId, fullSong);
    }

    // Call parent callback either way
    if (onSongSelected) {
      onSongSelected(fullSong);
    }

    // Reset UI
    setSuggestions([]);
    setSearchTerm("");
  }

  return (
    <Box borderWidth="1px" borderRadius="md" p={5} mb={6} mt={6}>
    <Heading size="sm" mb={3}>🎵 Load a Song</Heading>
    <form onSubmit={handleSubmit}>
      <Input
        placeholder="Enter song name"
        value={searchTerm}
        onChange={handleSearchChange}
        mb={2}
      />
      <Button type="submit" colorScheme="blue" mb={3}>
        Search
      </Button>
    </form>
    {suggestions?.length > 0 && (
      <List spacing={2} border="1px solid #ccc" borderRadius="md" p={2}>
        {suggestions.map((song) => (
          <ListItem key={song.id}>
            <Button onClick={() => handleSelect(song)} variant="link">
              {song.title}
            </Button>
          </ListItem>
        ))}
      </List>
    )}
  </Box>
  );
}

export default AdminSongPicker;

