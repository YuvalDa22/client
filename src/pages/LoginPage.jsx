import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Input, Button, Heading, VStack, Select } from "@chakra-ui/react";
import { toast } from "react-toastify";

import { signup, login, getLoggedInUser } from "../services/auth.service";

function LoginPage() {
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
      await signup({ username, password, instrument });
      toast.success("Signup successful!");
      const user = getLoggedInUser();
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
