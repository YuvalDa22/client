import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Input,
  Select,
  Button,
  Heading,
  VStack,
} from "@chakra-ui/react";

import { toast } from "react-toastify";
import InstrumentSelector from "./InstrumentSelector.jsx";
import { createSession, joinSession } from "../services/session.service.js";


function SessionForm() {
  const [username, setUsername] = useState("");
  const [instrument, setInstrument] = useState("");
  const [sessionId, setSessionId] = useState("");
  const navigate = useNavigate();

  async function handleCreateSession() {
    if (!username || !instrument) {
      return toast.error("Please enter your name and instrument.");
    }
    try {
      const res = await createSession({ username, instrument });
      const createdSession = res.data.session;
      navigate(`/session/${createdSession.sessionId}`);
    } catch (error) {
      console.error("Error creating session:", error);
      toast.error("Failed to create session.");
    }
  }

  async function handleJoinSession() {
    if (!username || !instrument || !sessionId) {
      return toast.error("Please enter all fields to join a session.");
    }

    try {
      const res = await joinSession(sessionId, { username, instrument });
      const session = res.data;
      navigate(`/session/${session.sessionId}`);
    } catch (error) {
      console.error("Error joining session:", error);
      toast.error("Failed to join session.");
    }
  }

  return (
    <Box
      maxW="sm"
      mx="auto"
      mt={10}
      p={6}
      borderWidth={1}
      borderRadius="md"
      boxShadow="md"
    >
      <Heading mb={6} size="lg" textAlign="center">
        🎵 JaMoveo
      </Heading>

      <VStack spacing={4}>
        <Input
          placeholder="Your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <InstrumentSelector
          value={instrument}
          onChange={(e) => setInstrument(e.target.value)}
        />

        <Button colorScheme="teal" width="100%" onClick={handleCreateSession}>
          Create New Session
        </Button>

        <Input
          placeholder="Enter session ID to join"
          value={sessionId}
          onChange={(e) => setSessionId(e.target.value)}
        />
        <Button colorScheme="blue" width="100%" onClick={handleJoinSession}>
          Join Session
        </Button>
      </VStack>
    </Box>
  );
}

export default SessionForm;
