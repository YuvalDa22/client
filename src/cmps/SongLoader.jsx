import { useState } from 'react'
import { Box, Input, Button, Heading, VStack } from '@chakra-ui/react'

function SongLoader({ onLoad }) {
    const [songQuery, setSongQuery] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        if (! songQuery.trim()) return;
        onLoad(songQuery.trim())
        setSongQuery('')
    };

    return (
        <Box borderWidth="1px" borderRadius="md" p={5} mb={6} mt={6}>
        <Heading size="sm" mb={3}>🎵 Load a Song</Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={3}>
            <Input
              placeholder="Enter song name"
              value={songQuery}
              onChange={(e) => setSongQuery(e.target.value)}
            />
            <Button type="submit" colorScheme="blue" width="full">
              Load Song
            </Button>
          </VStack>
        </form>
      </Box>
    );
}
export default SongLoader