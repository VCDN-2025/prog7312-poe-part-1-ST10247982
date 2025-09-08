import {
  Button,
  Field,
  Fieldset,
  For,
  Input,
  Heading,
  Stack,
} from "@chakra-ui/react";
import { PasswordInput } from "@/components/ui/password-input";
import { useState } from "react";
export function Register() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  return (
    <Fieldset.Root size="lg" maxW="md" alignContent={"center"}>
      <Heading alignSelf={"center"}>UrbanSync</Heading>
      <Stack>
        <Fieldset.Legend>Contact details</Fieldset.Legend>
        <Fieldset.HelperText>
          Please provide your contact details below.
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
            placeholder="Something.1"
            name="username"
            type="text"
            variant={"subtle"}
          />
        </Field.Root>
        <Field.Root>
          <Field.Label>Email address</Field.Label>
          <Input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            name="email"
            placeholder="UrbanSync@gmail.com"
            type="email"
            variant={"subtle"}
          />
        </Field.Root>
        <Field.Root>
          <Field.Label>Name</Field.Label>
          <Input
            placeholder="Urban Sync"
            value={name}
            onChange={(e) => {
              setName;
            }}
            name="name"
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
        <Field.Root>
          <Field.Label>Confirm Password</Field.Label>
          <PasswordInput
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
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
  );
}
