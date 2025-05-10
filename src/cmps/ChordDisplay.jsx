import { useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  ScaleFade,
} from "@chakra-ui/react";
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
        <ScaleFade initialScale={0.5} in={true} key={countdown}>
          <Text fontSize="6xl" color="teal.400" fontWeight="bold">
            {countdown}
          </Text>
        </ScaleFade>
      </Box>
    );
  }

  return (
    <Box mt={8}>
      <Heading size="md" mb={4} textAlign="center">
        🎶 {song.name}
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

export default ChordDisplay;
