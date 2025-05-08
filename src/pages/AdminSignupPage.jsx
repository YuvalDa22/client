import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Input, Button, Heading, VStack } from "@chakra-ui/react";
import { toast } from "react-toastify";

import { signup } from "../services/auth.service";
import InstrumentSelector from "../cmps/InstrumentSelector";

function AdminSignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [instrument, setInstrument] = useState("");
  const navigate = useNavigate();

  async function handleAdminSignup() {
    if (!username || !password) {
      return toast.error("Please fill in all fields.");
    }

    try {
      const user = await signup({
        username,
        password,
        instrument, 
        role: "admin",
      });

      toast.success(`Admin account created for ${user.username}`);
      navigate("/");
    } catch (err) {
      console.error("Admin signup error:", err);
      toast.error("Signup failed");
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
        Admin Signup
      </Heading>
      <VStack spacing={4}>
        <Input
          placeholder="Admin username"
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
          value={instrument}
          onChange={(e) => setInstrument(e.target.value)}
        />
        <Button colorScheme="purple" width="100%" onClick={handleAdminSignup}>
          Register as Admin
        </Button>
      </VStack>
    </Box>
  );
}

export default AdminSignupPage;
