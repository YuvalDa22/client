import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Input, Button, Heading, VStack, Text } from "@chakra-ui/react";
import { toast } from "react-toastify";

import { createSession, joinSession } from "../services/session.service";
import { getLoggedInUser } from "../services/auth.service";

function SessionForm() {
  const [user, setUser] = useState(null);
  const [sessionId, setSessionId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = getLoggedInUser();
    setUser(storedUser);
  }, []);


  async function handleCreateSession() {
    try {
      const res = await createSession({ userId: user.id });
      const createdSession = res.data.session;
      navigate(`/session/${createdSession.sessionId}`);
    } catch (error) {
      console.error("Error creating session:", error);
      toast.error("Failed to create session.");
    }
  }

  async function handleJoinSession() {
    if (!sessionId) {
      return toast.error("Please enter a session ID");
    }

    try {
      const res = await joinSession(sessionId, { userId: user.id });
      navigate(`/session/${res.data.sessionId}`);
    } catch (error) {
      console.error("Error joining session:", error);
      toast.error("Failed to join session.");
    }
  }

  if(!user) {
    return null;
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
        Welcome, {user.username}
      </Heading>
      <Text>Role: {user.role}</Text>

      <VStack spacing={4}>
        <Text>
          Instrument: <strong>{user.instrument}</strong>
        </Text>

        {/* {(user?.role === "admin") && (
          <Button colorScheme="teal" width="100%" onClick={handleCreateSession}>
            Create New Session
          </Button>
        )} */}

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
