import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Heading, Text, List, ListItem } from "@chakra-ui/react";

import AdminSongPicker from "../cmps/AdminSongPicker.jsx";
import ChordDisplay from "../cmps/ChordDisplay.jsx";

import { getLoggedInUser } from "../services/auth.service.js";
import {
  connectSocket,
  disconnectSocket,
  onSongUpdate,
  onUserListUpdate,
  onCountdownStarted,
} from "../services/socket.service.js";

function SessionPage() {
  const { id: sessionId } = useParams();
  const user = getLoggedInUser();

  const [currentSong, setCurrentSong] = useState(null);
  const [usersInSession, setUsersInSession] = useState([]);
  const [phase, setPhase] = useState("idle");
  const [count, setCount] = useState(3);

  useEffect(() => {
    if (user && sessionId) {
      connectSocket(sessionId, user.username, user.role);

      onSongUpdate((song) => {
        setCurrentSong(song);
        setPhase("idle");
      });

      onCountdownStarted(() => {
        setPhase("countdown");
        setCount(3);
      });

      onUserListUpdate((users) => setUsersInSession(users));
    }

    return () => {
      disconnectSocket();
    };
  }, [sessionId]);

  useEffect(() => {
    if (phase === "countdown" && count > 0) {
      const timer = setTimeout(() => {
        setCount((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (phase === "countdown" && count === 0) {
      setPhase("display");
    }
  }, [phase, count]);

  function handleLoadSong(song) {
    setCurrentSong(song);
  }

  if (!user) return null;

  return (
    <Box maxW="4xl" mx="auto" mt={10} p={6}>
      <Heading size="lg" mb={4}>
        🎸 Live Jam Session
      </Heading>

      <Text fontSize="md" mb={6}>
        Session ID: <strong>{sessionId}</strong>
      </Text>

      {user.role === "admin" && (
        <>
          <Box mt={6}>
            <Heading size="sm" mb={2}>
              Participants:
            </Heading>

            <List spacing={1}>
              {usersInSession?.map((user, idx) => (
                <ListItem key={idx}>
                  {user.username} ({user.role})
                </ListItem>
              ))}
            </List>

            <AdminSongPicker
              sessionId={sessionId}
              onSongSelected={handleLoadSong}
            />
          </Box>
        </>
      )}

      {!currentSong && user.role !== "admin" && (
        <Text mt={6} fontSize="lg" textAlign="center" color="gray.500">
          Waiting for the admin to load a song...
        </Text>
      )}

      {currentSong && (
        <ChordDisplay
          instrument={user.instrument}
          song={currentSong}
          phase={phase}
          countdown={count}
        />
      )}
    </Box>
  );
}

export default SessionPage;
