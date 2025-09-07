import { useEffect, useState } from "react";

import system from "../chakra.config";
import { Box, Text, Button, ChakraProvider, HStack } from "@chakra-ui/react";
function App() {
  return (
    <ChakraProvider value={system}>
      <Box>
        <Text>Hello</Text>
      </Box>
    </ChakraProvider>
  );
}

export default App;
