import { useEffect, useState } from 'react';
import { Input, Box, List, ListItem, Heading } from '@chakra-ui/react';
import { fetchSongs } from '../services/song.service.js';

function AdminMainPage() {
  const [search, setSearch] = useState('');
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    async function loadSongs() {
      const data = await fetchSongs(search);
      setSongs(data);
    }
    loadSongs();
  }, [search]);

  return (
    <Box maxW="lg" mx="auto" mt={8}>
      <Heading mb={4}>Search Songs</Heading>
      <Input
        placeholder="Search for a song..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        mb={4}
      />
      <List spacing={3}>
        {songs.map((song) => (
          <ListItem key={song.id}>
            🎵 {song.title}
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
export default AdminMainPage;
