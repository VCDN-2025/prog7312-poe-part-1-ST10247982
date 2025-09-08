import { Button, Field, Fieldset, Input, Stack } from "@chakra-ui/react";
function Login() {
  return (
    <Fieldset.Root size="lg" maxW="md" alignContent={"center"}>
      <Stack>
        <Fieldset.Legend>Contact details</Fieldset.Legend>
        <Fieldset.HelperText>
          Please provide your contact details below.
        </Fieldset.HelperText>
      </Stack>

      <Fieldset.Content>
        <Field.Root>
          <Field.Label>Name</Field.Label>
          <Input name="name" />
        </Field.Root>

        <Field.Root>
          <Field.Label>Email address</Field.Label>
          <Input name="email" type="email" />
        </Field.Root>
        <Field.Root>
          <Field.Label>Username</Field.Label>
          <Input name="username" type="text" />
        </Field.Root>
      </Fieldset.Content>

      <Button type="submit" alignSelf="flex-start">
        Submit
      </Button>
    </Fieldset.Root>
  );
}
