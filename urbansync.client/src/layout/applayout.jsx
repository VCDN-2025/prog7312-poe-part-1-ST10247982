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
  Container,
} from "@chakra-ui/react";

import { useNavigate } from "react-router-dom";
import { MainMenu } from "../components/Menu";

export function AppLayout() {
  const navigate = useNavigate();
  return (
    <Flex
      bg={"blackAlpha.900"}
      width={"100%"}
      height={"4vw"}
      alignItems={"center"}
      shadow={"md"}
    >
      <Box p={"20"} alignItems={"center"}>
        <Button
          width={"4vw"}
          minWidth={"2vw"}
          maxWidth={"8vw"}
          variant={"subtle"}
          color={"white"}
          bgColor={"black"}
          onClick={navigate("/")}
          fontSize={"2xl"}
        >
          UrbanSync
        </Button>
      </Box>
      <Spacer />
      <Box p={"10"} alignItems={"center"}>
        {" "}
        <MainMenu isLoggedIn={false} />
        </Box>
    </Flex>
  );
}
