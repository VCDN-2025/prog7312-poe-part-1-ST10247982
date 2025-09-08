import { useEffect, useState } from "react";
import { AppLayout } from "./layout/applayout";

import system from "../chakra.config";
import {
  Box,
  Text,
  Button,
  ChakraProvider,
  HStack,
  Avatar,
  Card,
  Center,
  AbsoluteCenter,
} from "@chakra-ui/react";
import { Home } from "./pages/Home";
import { ReportIssue } from "./pages/ReportIssue";
function App() {
  return (
    <>
      <ChakraProvider value={system}>
        <AppLayout />
        <Home />
        <Center>
          <ReportIssue />
        </Center>
      </ChakraProvider>
    </>
  );
}

export default App;
