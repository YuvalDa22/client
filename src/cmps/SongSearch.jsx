import { useState, useCallback, useEffect } from "react";
import { Input, Box, List, ListItem, Button } from "@chakra-ui/react";
import debounce from "lodash.debounce";
import { fetchSongs, fetchSongById } from "../services/song.service.js";
import { emitLoadSong } from "../services/socket.service.js";

function SongSearch({ sessionId, onSongLoaded }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);


  // This prevents state updates or network requests after the component is unmounted
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

  async function handleSelect(song) {
    const fullSong = await fetchSongById(song.id);
    emitLoadSong(sessionId, fullSong);
    onSongLoaded(fullSong); // local state update
    setSuggestions([]);
    setSearchTerm("");
  }

  return (
    <Box>
      <Input
        placeholder="Search for a song..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {suggestions.length > 0 && (
        <List
          spacing={2}
          mt={2}
          border="1px solid #ccc"
          borderRadius="md"
          p={2}
        >
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

export default SongSearch;
