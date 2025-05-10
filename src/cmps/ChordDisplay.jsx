import { Box, Heading, Text, VStack } from "@chakra-ui/react";

// Dynamic component based on the user's instrument, won't show chords for vocals
// and will show them for all other instruments
function ChordDisplay({ song, instrument }) {
    if (!song || !song.content) return null;
  
    const showChords = instrument !== "vocals";
  
    return (
      <Box mt={8}>
        <Heading size="md" mb={4} textAlign="center">
          🎶 {song.title}
        </Heading>
  
        <VStack align="start" spacing={3}>
          {song.content.map((line, lineIdx) => (
            <Box key={lineIdx}>
              {showChords && (
                <Text fontFamily="monospace" fontSize="sm" color="teal.500">
                  {line.map((word) =>
                    word.chords ? `${word.chords} `.padEnd(word.lyrics.length + 2) : " ".repeat(word.lyrics.length + 2)
                  )}
                </Text>
              )}
              <Text fontFamily="monospace">
                {line.map((word) => word.lyrics + " ").join("")}
              </Text>
            </Box>
          ))}
        </VStack>
      </Box>
    );
  }
  
  export default ChordDisplay;
