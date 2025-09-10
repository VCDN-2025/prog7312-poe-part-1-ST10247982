import {
  Button,
  Field,
  Fieldset,
  Input,
  Stack,
  Heading,
  ChakraProvider,
  Box,
  Card,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { useState, useEffect } from "react";
import system from "../../chakra.config";
import { login } from "../api/auth";
import { useNavigate } from "react-router-dom";
export function Login() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const loadingMessages = [
    "Securing connection...",
    "Loading system resources...",
    "Verifying user session...",
    "Preparing dashboard...",
    "Finalizing setup...",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 5000); // change every 5 seconds
    return () => clearInterval(interval);
  }, [loadingMessages.length]);

  const onSubmit = async () => {
    setLoading(true);
    const user = { username: username, password: password };
    const response = await login(user);
    console.log(response);
    if (!response) {
      setError("Something went wrong!");
      setLoading(false);
    }

    if (response.status == 200) {
      setSuccess(true);
    } else {
      setError(response.data);
    }
  };
  useEffect(() => {
    if (success === true) {
      navigate("/login");
    }
  }, [success, navigate]);
  if (loading === true) {
    return (
      <ChakraProvider value={system}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width={"100vw"}
          height={"50vw"}
          backdropBlur={"md"}
          blur={"brand.primary"}
          bgColor={"brand.background"}
        >
          <Card.Root
            minWidth={"xs"}
            width={"lg"}
            alignItems={"center"}
            bg={"brand.onContainer"}
            minH={"xs"}
            p={"5"}
            shadowColor="brand.accents"
            _hover={{
              shadow: "-1px 20px 50px var(--shadow-color)",
              boxShadowColor: "brand.primary",
            }}
            transition="shadow"
            transitionDuration="slow"
            padding={""}
            justifyContent={"center"}
          >
            <Spinner size="xl" color="brand.primary" />
            <Text>{loadingMessages[index]}</Text>
          </Card.Root>
        </Box>
      </ChakraProvider>
    );
  } else {
    return (
      <ChakraProvider value={system}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width={"100vw"}
          height={"50vw"}
          backdropBlur={"md"}
          blur={"brand.primary"}
          bgColor={"brand.background"}
        >
          <Card.Root
            minWidth={"xs"}
            width={"lg"}
            alignItems={"center"}
            bg={"brand.onContainer"}
            height={"55vw"}
            maxH={"500px"}
            minH={"xs"}
            p={"5"}
            shadowColor="brand.accents"
            _hover={{
              shadow: "-1px 20px 50px var(--shadow-color)",
              boxShadowColor: "brand.primary",
            }}
            transition="shadow"
            transitionDuration="slow"
          >
            <Fieldset.Root
              size="lg"
              maxW="xl"
              width={"md"}
              height={"lg"}
              rounded={"x1"}
            >
              <Heading alignSelf={"center"}>UrbanSync</Heading>
              <Stack alignItems={"center"}>
                <Fieldset.Legend>Sign in details</Fieldset.Legend>
                <Fieldset.HelperText>
                  Please provide your account details to sign in
                </Fieldset.HelperText>
              </Stack>

              <Fieldset.Content>
                <Field.Root>
                  <Field.Label>Username</Field.Label>
                  <Input
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    name="username"
                    variant="outline"
                    bgColor={"brand.input"}
                    color={"brand.primaryText"}
                    outline={"solid"}
                    outlineWidth={"1px"}
                    outlineColor={"brand.primary"}
                    _focus={{ outlineColor: "black" }}
                  />
                </Field.Root>
                <Field.Root>
                  <Field.Label>Password</Field.Label>
                  <PasswordInput
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    name="password"
                    variant="outline"
                    bgColor={"brand.input"}
                    color={"brand.primaryText"}
                    outline={"solid"}
                    outlineWidth={"1px"}
                    outlineColor={"brand.primary"}
                    _focus={{ outlineColor: "black" }}
                  />
                  {error && <Field.ErrorText>{error}</Field.ErrorText>}
                </Field.Root>
              </Fieldset.Content>

              <Button
                type="button"
                alignSelf="center"
                width={"6vw"}
                bgColor={"brand.primary"}
                onClick={onSubmit}
              >
                Submit
              </Button>
            </Fieldset.Root>
          </Card.Root>
        </Box>
      </ChakraProvider>
    );
  }
}
