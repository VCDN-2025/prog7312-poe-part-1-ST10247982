import {
  Button,
  Field,
  Fieldset,
  Box,
  Input,
  Heading,
  Stack,
  ChakraProvider,
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

  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
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

  const onSubmit = () => {
    const isValid = validate();
    if (isValid) {
      setSuccess(true);
    }
  };

  useEffect(() => {
    if (success === true) {
      navigate("/login");
    }
  }, [success, navigate]);

  return (
    <ChakraProvider value={system}>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width={"100vw"}
        height={"50vw"}
      >
        <Fieldset.Root
          size={"lg"}
          maxW={"md"}
          rounded={"xl"}
          shadow={"lg"}
          backdropBlur={"md"}
          bgColor={"brand.primary"}
        >
          <Heading alignSelf="center" mb={4}>
            UrbanSync
          </Heading>
          <Stack spacing={6}>
            <Fieldset.Legend>Contact details</Fieldset.Legend>
            <Fieldset.HelperText>
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
                  variant="subtle"
                  color={"brand.primary"}
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
                  variant="subtle"
                />
                {emailError && <Field.ErrorText>{emailError}</Field.ErrorText>}
              </Field.Root>

              {/* Name */}
              <Field.Root invalid={nameError}>
                <Field.Label>Name</Field.Label>
                <Input
                  placeholder="Urban Sync"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  name="name"
                  variant="subtle"
                />
                {nameError && <Field.ErrorText>{nameError}</Field.ErrorText>}
              </Field.Root>

              {/* Password */}
              <Field.Root invalid={passwordError}>
                <Field.Label>Password</Field.Label>
                <PasswordInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  variant="subtle"
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
                  variant="subtle"
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
              colorScheme="blue"
            >
              Submit
            </Button>
          </Stack>
        </Fieldset.Root>
      </Box>
    </ChakraProvider>
  );
}
