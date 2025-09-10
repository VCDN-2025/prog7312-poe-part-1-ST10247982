import {
  Button,
  Field,
  Fieldset,
  Box,
  Input,
  Heading,
  Stack,
  ChakraProvider,
  Card,
  Spinner,
} from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import {
  isValidEmail,
  isValidName,
  isValidPassword,
  isValidUsername,
} from "../validation/auth.validator";
import system from "../../chakra.config.js";
import { register } from "../api/auth.js";

export function Register() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  // error states
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const registerMessages = [
    "Creating your account...",
    "Securing your information...",
    "Configuring user settings...",
    "Linking services...",
    "Finalizing registration...",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % registerMessages.length);
    }, 10000); // changes every 5 seconds
    return () => clearInterval(interval);
  }, [registerMessages.length]);

  const validate = () => {
    const emailOk = isValidEmail(email);
    const nameOk = isValidName(name);
    const passwordOk = isValidPassword(password);
    const usernameOk = isValidUsername(username);

    // set error messages from validator return values
    setEmailError(emailOk === true ? "" : emailOk);
    console.log(emailError);
    console.log(usernameError);
    setNameError(nameOk === true ? "" : nameOk);
    setPasswordError(passwordOk === true ? "" : passwordOk);
    setUsernameError(usernameOk === true ? "" : usernameOk);
    setConfirmPasswordError(
      password !== confirmPassword ? "Passwords do not match" : ""
    );

    // return true only if all validators pass
    return (
      emailOk === true &&
      nameOk === true &&
      passwordOk === true &&
      usernameOk === true &&
      password === confirmPassword
    );
  };

  const onSubmit = async () => {
    const isValid = validate();
    if (!isValid) {
      return;
    }
    setLoading(true);
    const response = await register(username, password, email, name);
    if (response.status == 201) {
      setSuccess(true);
    } else {
      setErrorMessage(response.data);
    }
    setLoading(true);
  };

  useEffect(() => {
    if (success === true) {
      navigate("/login");
    }
  }, [success, navigate]);
  if (loading) {
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
            <Text>{registerMessages[index]}</Text>
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
          bgColor={"brand.background"}
        >
          <Card.Root
            minWidth={"xs"}
            width={"lg"}
            alignItems={"center"}
            bg={"brand.onContainer"}
            height={"55vw"}
            maxH={"700px"}
            minH={"xs"}
            p={"5"}
            shadowColor="brand.accents"
            _hover={{
              shadow: "-1px 20px 50px var(--shadow-color)",
              boxShadowColor: "brand.primary",
            }}
            transition="shadow"
            transitionDuration="slow"
            backdropBlur={"md"}
          >
            <Fieldset.Root
              maxW={"md"}
              rounded={"xl"}
              color={"brand.primaryText"}
            >
              <Heading alignSelf="center" mb={4} color={"brand.primaryText"}>
                UrbanSync
              </Heading>
              <Stack spacing={6}>
                <Fieldset.Legend color={"brand.primaryText"}>
                  Contact details
                </Fieldset.Legend>
                <Fieldset.HelperText color={"brand.primaryText"}>
                  Please provide your contact details below.
                </Fieldset.HelperText>

                <Fieldset.Content>
                  {/* Username */}
                  <Field.Root invalid={usernameError}>
                    <Field.Label>Username</Field.Label>
                    <Input
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="Something.1"
                      name="username"
                      type="text"
                      variant="outline"
                      bgColor={"brand.input"}
                      color={"brand.primaryText"}
                      outline={"solid"}
                      outlineWidth={"1px"}
                      outlineColor={"brand.primary"}
                      _focus={{ outlineColor: "black" }}
                    />

                    <Field.ErrorText>{usernameError}</Field.ErrorText>
                  </Field.Root>

                  {/* Email */}
                  <Field.Root invalid={emailError}>
                    <Field.Label>Email address</Field.Label>
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      name="email"
                      placeholder="UrbanSync@gmail.com"
                      type="email"
                      variant="outline"
                      bgColor={"brand.input"}
                      color={"brand.primaryText"}
                      outline={"solid"}
                      outlineWidth={"1px"}
                      outlineColor={"brand.primary"}
                      _focus={{ outlineColor: "black" }}
                    />
                    {emailError && (
                      <Field.ErrorText>{emailError}</Field.ErrorText>
                    )}
                  </Field.Root>

                  {/* Name */}
                  <Field.Root invalid={nameError}>
                    <Field.Label>Name</Field.Label>
                    <Input
                      placeholder="Urban Sync"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      name="name"
                      variant="outline"
                      bgColor={"brand.input"}
                      color={"brand.primaryText"}
                      outline={"solid"}
                      outlineWidth={"1px"}
                      outlineColor={"brand.primary"}
                      _focus={{ outlineColor: "black" }}
                    />
                    {nameError && (
                      <Field.ErrorText>{nameError}</Field.ErrorText>
                    )}
                  </Field.Root>

                  {/* Password */}
                  <Field.Root invalid={passwordError}>
                    <Field.Label>Password</Field.Label>
                    <PasswordInput
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      name="password"
                      variant="outline"
                      bgColor={"brand.input"}
                      color={"brand.primaryText"}
                      outline={"solid"}
                      outlineWidth={"1px"}
                      outlineColor={"brand.primary"}
                      _focus={{ outlineColor: "black" }}
                    />
                    {passwordError && (
                      <Field.ErrorText>{passwordError}</Field.ErrorText>
                    )}
                  </Field.Root>

                  {/* Confirm Password */}
                  <Field.Root invalid={confirmPasswordError}>
                    <Field.Label>Confirm Password</Field.Label>
                    <PasswordInput
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      name="confirmPassword"
                      variant="outline"
                      bgColor={"brand.input"}
                      color={"brand.primaryText"}
                      outline={"solid"}
                      outlineWidth={"1px"}
                      outlineColor={"brand.primary"}
                      _focus={{ outlineColor: "black" }}
                    />
                    {confirmPasswordError && (
                      <Field.ErrorText>{confirmPasswordError}</Field.ErrorText>
                    )}
                  </Field.Root>
                </Fieldset.Content>

                <Button
                  onClick={onSubmit}
                  type="button"
                  alignSelf="center"
                  width="50%"
                  bgColor={"brand.primary"}
                >
                  Submit
                </Button>
              </Stack>
            </Fieldset.Root>
          </Card.Root>
        </Box>
      </ChakraProvider>
    );
  }
}
