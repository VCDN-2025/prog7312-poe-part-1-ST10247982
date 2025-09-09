import system from "../../chakra.config";
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Image,
  useToken,
  ChakraProvider,
} from "@chakra-ui/react";

import { Link as RouterLink } from "react-router-dom";

export default function NotFound() {
  return (
    <ChakraProvider value={system}>
      <Box
        minH="100vh"
        bg={"brand.background"}
        display="flex"
        justifyContent="center"
        alignItems="center"
        px={6}
      >
        <VStack spacing={8} textAlign="center" maxW="lg">
          {/* Illustration / Icon */}
          <Image
            src="https://cdn-icons-png.flaticon.com/512/2748/2748558.png"
            alt="Not Found Illustration"
            boxSize={{ base: "120px", md: "180px" }}
          />

          {/* Heading */}
          <Heading size="3xl" color={"brand.onContainer"}>
            404
          </Heading>
          <Text fontSize="xl" color={"brand.accents"} fontWeight="semibold">
            Oops! The page you’re looking for doesn’t exist.
          </Text>
          <Text fontSize="md" color={"brand.onContainer"}>
            It seems you’ve taken a wrong turn. Let’s get you back on track to
            reporting and resolving service delivery issues.
          </Text>

          {/* Actions */}
          <HStack spacing={4} pt={4}>
            <Button
              as={RouterLink}
              to="/"
              bg={"brand.primary"}
              color="white"
              _hover={{ bg: "brand.accents", color: "brand.background" }}
            >
              Go Home
            </Button>
            <Button
              as={RouterLink}
              to="/report-issue"
              variant="outline"
              borderColor={"brand.primary"}
              color={"brand.primary"}
              _hover={{ bg: "brand.primary", color: "white" }}
            >
              Report an Issue
            </Button>
          </HStack>
        </VStack>
      </Box>
    </ChakraProvider>
  );
}
