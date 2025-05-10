import { Box, Heading } from "@chakra-ui/react";
import AdminSongPicker from "../cmps/AdminSongPicker";

function AdminMainPage() {
  function handleSongSelected(song) {
    console.log("Admin selected song:", song);
  }

  return (
    <Box maxW="lg" mx="auto" mt={8}>
      <Heading mb={4}>🎼 Pick a Song to Preview</Heading>
      <AdminSongPicker onSongSelected={handleSongSelected} />
    </Box>
  );
}

export default AdminMainPage;
