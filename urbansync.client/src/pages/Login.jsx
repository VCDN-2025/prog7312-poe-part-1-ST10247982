import {
  Button,
  Field,
  Fieldset,
  Input,
  Stack,
  Heading,
  ChakraProvider,
  Box,
  Card
} from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { useState } from "react";
import system from "../../chakra.config";
export function Login() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
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
            boxShadowColor: "brand.accents",
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
                  variant={"subtle"}
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
                  variant={"subtle"}
                />
                <Field.ErrorText>skdfhsdkjfh</Field.ErrorText>
              </Field.Root>
            </Fieldset.Content>

            <Button type="submit" alignSelf="center" width={"6vw"}>
              Submit
            </Button>
          </Fieldset.Root>
        </Card.Root>
      </Box>
    </ChakraProvider>
  );
}
