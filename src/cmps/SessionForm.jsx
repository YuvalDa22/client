import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Box,
  Input,
  Select,
  Button,
  Heading,
  VStack,
  useToast,
} from "@chakra-ui/react";

import InstrumentSelector from "./InstrumentSelector.jsx";
import { createSession, joinSession } from "../services/session.service.js";

function SessionForm() {
  const [username, setUsername] = useState("");
  const [instrument, setInstrument] = useState("");
  const [sessionId, setSessionId] = useState("");
  const toast = useToast();
  const navigate = useNavigate();

  async function handleCreateSession() {
    if (!username || !instrument) {
      return toast({
        title: "Missing fields",
        description: "Please enter your name and instruments.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    try {
      const res = await createSession({ username, instrument });
      const createdSession = res.data.session;
      navigate(`/session/${createdSession.sessionId}`);
    } catch (error) {
      console.error("Error creating session:", error);
      toast({
        title: "Error",
        description: "Failed to create session.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  async function handleJoinSession() {
    if (!username || !instrument || !sessionId) {
      return toast({
        title: "Missing fields",
        description: "Please enter all fields to join a session.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }

    try {
      const res = await joinSession(sessionId, { username, instrument });
      const session = res.data;
      navigate(`/session/${session.sessionId}`);
    } catch (error) {
      console.error("Error joining session:", error);
      toast({
        title: 'Error',
        description: 'Failed to join session.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }

  return (
    <Box maxW="sm" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="md" boxShadow="md">
      <Heading mb={6} size="lg" textAlign="center">
        🎵 JaMoveo
      </Heading>

      <VStack spacing={4}>
        <Input
          placeholder="Your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Select
          placeholder="Select instrument"
          value={instrument}
          onChange={(e) => setInstrument(e.target.value)}
        >
          <option value="vocals">Vocals</option>
          <option value="guitar">Guitar</option>
          <option value="drums">Drums</option>
          <option value="bass">Bass</option>
          <option value="saxophone">Saxophone</option>
          <option value="keyboards">Keyboards</option>
        </Select>

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
