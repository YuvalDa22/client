import { useParams } from "react-router-dom";
import { Box, Heading, Text } from "@chakra-ui/react";
import ChordDisplay from "../cmps/ChordDisplay.jsx";
import SongLoader from "../cmps/SongLoader.jsx";

const mockUser = {
  username: "Yuval",
  role: "admin",
  instrument: "vocals",
};

function SessionPage() {
  const { sessionId } = useParams();
  const [currentSong, setCurrentSong] = useState(null);

  function handleLoadSong(songName) {
    setCurrentSong({ title: songName, chords: ["C", "G", "Am", "F"] }); //mock for now
  }

  return (
    <Box maxW="4xl" mx="auto" mt={10} p={6}>
      {mockUser.role === "admin" && <SongLoader onLoad={handleLoadSong} />}
      <Heading size="lg" mb={4}>
        🎸 Live Jam Session
      </Heading>
      <Text fontSize="md" mb={6}>
        Session ID: <strong>{sessionId}</strong>
      </Text>

      {/* Main chord UI component */}
      <ChordDisplay
        sessionId={sessionId}
        instrument={mockUser.instrument}
        song={currentSong}
      />
    </Box>
  );
}

export default SessionPage;
