import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Input, Button, Heading, VStack, Select } from "@chakra-ui/react";
import { toast } from "react-toastify";

import {
  signup,
  login,
  getLoggedInUser,
  isLoggedIn,
} from "../services/auth.service.js";
import InstrumentSelector from "../cmps/InstrumentSelector.jsx"

function LoginPage({ setLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [instrument, setInstrument] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/");
    }
  }, []);

  async function handleSignup() {
    if (!username || !password || !instrument) {
      return toast.error("Please fill all fields");
    }

    try {
      const user = await signup({ username, password, instrument });
      toast.success(`Welcome, ${user.username}!`);
      navigate("/");
    } catch (err) {
      console.error("Signup error:", err);
      toast.error("Signup failed");
    }
  }

  async function handleLogin() {
    try {
      await login({ username, password });
      setLoggedIn(true);
      toast.success("Login successful!");
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);
      toast.error("Login failed");
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
        Login or Signup
      </Heading>
      <VStack spacing={4}>
        <Input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <InstrumentSelector
        value ={instrument}
        onChange={(e) => setInstrument(e.target.value)}
        />
        <Button onClick={handleSignup} colorScheme="teal" width="100%">
          Signup
        </Button>
        <Button onClick={handleLogin} colorScheme="blue" width="100%">
          Login
        </Button>
      </VStack>
    </Box>
  );
}

export default LoginPage;
