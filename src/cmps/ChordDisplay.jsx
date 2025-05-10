import { useEffect, useState } from "react";
import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import useSound from "use-sound";
import beepSfx from "../assets/beep.mp3";
import { onCountdownStarted } from "../services/socket.service";

function ChordDisplay({ song, instrument }) {
  const [phase, setPhase] = useState("idle");
  const [count, setCount] = useState(3);
  const [playBeep] = useSound(beepSfx);
  const showChords = instrument !== "vocals";

  useEffect(() => {
    onCountdownStarted(() => {
      setPhase("countdown");
      setCount(3);
    });
  }, []);

  useEffect(() => {
    if (phase === "countdown" && count > 0) {
      playBeep();
      const timer = setTimeout(() => setCount((c) => c - 1), 1000);
      return () => clearTimeout(timer);
    } else if (phase === "countdown" && count === 0) {
      setPhase("display");
    }
  }, [count, phase, playBeep]);

  if (!song || !song.content) return null;

  if (phase === "countdown") {
    return (
      <Box mt={8} textAlign="center">
        <Heading size="lg" mb={4}>
          Are you ready to jam?
        </Heading>
        <Text fontSize="6xl" color="teal.400">
          {count > 0 ? count : null}
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
