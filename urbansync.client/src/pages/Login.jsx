import {
  Button,
  Field,
  Fieldset,
  Input,
  Stack,
  Heading,
} from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { useState } from "react";
export function Login() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  return (
    <>
      <Fieldset.Root size="lg" maxW="md">
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
    </>
  );
}
