import {
  CardHeader,
  Field,
  Input,
  Text,
  Flex,
  Box,
  Link,
  Button,
  Spacer,
} from "@chakra-ui/react";
import { Card } from "@chakra-ui/react";

export function AppLayout() {
  return (
    <Flex
      bg={"brand.primary"}
      width={"100vw"}
      height={"4vw"}
      alignItems={"center"}
      shadow={"md"}
    >
      <Box p={"10"} alignItems={"center"}>
        <Button
          width={"4vw"}
          minWidth={"2vw"}
          maxWidth={"8vw"}
          variant={"subtle"}
          color={"white"}
          bg={"brand.primary"}
        >
          Home
        </Button>
      </Box>
      <Spacer />
      <Box p={"10"} alignItems={"center"}>
        <Button
          width={"4vw"}
          minWidth={"2vw"}
          maxWidth={"8vw"}
          bgColor={"brand.primary"}
          
        >
          Settings
        </Button>
      </Box>
    </Flex>
  );
}
