import { Box, Container } from '@chakra-ui/react';
import SessionForm from '../cmps/SessionForm.jsx';

function HomePage() {
  return (
    <SessionForm />
    // <Container maxW="md" centerContent>
    //   <Box w="100%" mt={10}>
    //     <SessionForm />
    //   </Box>
    // </Container>
  );
}

export default HomePage;
