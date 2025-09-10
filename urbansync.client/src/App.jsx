import { useEffect, useState } from "react";
import { AppLayout } from "./layout/applayout";

import system from "../chakra.config";
import { Box, ChakraProvider, Center, Stack } from "@chakra-ui/react";
import { Home } from "./pages/Home";

import { DashboardCard } from "./components/DashBoardCard";
function App() {


  return (
    <>
      <ChakraProvider value={system}>
        <AppLayout />

        <Center>
          <Home />
        </Center>
      </ChakraProvider>
    </>
  );
}

export default App;
