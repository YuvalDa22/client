import { useEffect } from "react";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import useSound from "use-sound";
import beepSfx from "../assets/beep.mp3";

function ChordDisplay({ song, instrument, phase, countdown }) {
  const showChords = instrument !== "vocals";
  const [playBeep] = useSound(beepSfx);

  
  useEffect(() => {
    if (phase === "countdown" && countdown > 0) {
      playBeep();
    }
  }, [countdown, phase, playBeep]);

  if (!song || !song.content) return null;

  if (phase === "countdown") {
    return (
      <Box mt={8} textAlign="center">
        <Heading size="lg" mb={4}>
          Are you ready to jam?
        </Heading>
        <Text fontSize="6xl" color="teal.400">
          {countdown > 0 ? countdown : null}
        </Text>
      </Box>
    );
  }

  if (phase === "display") {
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
                    word.chords
                      ? `${word.chords} `.padEnd(word.lyrics.length + 2)
                      : " ".repeat(word.lyrics.length + 2)
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

  return null;
}

export default ChordDisplay;
