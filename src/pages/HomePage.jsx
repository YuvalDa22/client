import { Box, Heading } from "@chakra-ui/react";
import SessionForm from "../cmps/SessionForm";
import { getLoggedInUser } from "../services/auth.service";

function HomePage() {
  const user = getLoggedInUser();

  return (
    <Box maxW="xl" mx="auto" mt={10} p={6}>
      <Heading mb={6} textAlign="center">
        Welcome back, {user?.username}!
      </Heading>
      <SessionForm />
    </Box>
  );
}

export default HomePage;
