import {
  Button,
  Field,
  Fieldset,
  Box,
  Input,
  NativeSelect,
  Stack,
  Card,
  ChakraProvider,
  FileUpload,
  Float,
  useFileUploadContext,
  Center,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { LuFileImage, LuX } from "react-icons/lu";
import system from "../../chakra.config";

export function ReportIssue() {
  const { isAuthenticated, logout } = useAuth();
  const [municipalityLevel, setMunicipalityLevel] = useState("");
  const [municipalitySector, setMunicipalitySector] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null); // single file

  // Convert file → Base64
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

  // Handle single file selection
  const handleFileChange = async (file) => {
    if (!file) return;
    const base64 = await toBase64(file);
    setImage({
      name: file.name,
      preview: URL.createObjectURL(file),
      base64,
    });
  };
  const FileUploadHandler = () => {
    const fileUpload = useFileUploadContext();
    const files = fileUpload.acceptedFiles;
    if (files.length === 0) return null;
    return (
      <FileUpload.ItemGroup>
        {files.map((file) => (
          <FileUpload.Item
            w="auto"
            boxSize="40"
            p="2"
            file={file}
            key={file.name}
          >
            <FileUpload.ItemPreviewImage />
            <Float placement="top-end">
              <FileUpload.ItemDeleteTrigger boxSize="4" layerStyle="fill.solid">
                <LuX />
              </FileUpload.ItemDeleteTrigger>
            </Float>
          </FileUpload.Item>
        ))}
      </FileUpload.ItemGroup>
    );
  };
  const ImageUpload = () => {
    return (
      <FileUpload.Root accept="image/*" transformFiles={toBase64(File)}>
        <FileUpload.HiddenInput />
        <FileUpload.Trigger asChild>
          <Button
            variant="outline"
            size="md"
            outline={"solid"}
            outlineWidth={"1px"}
            outlineColor={"brand.primary"}
          >
            <LuFileImage /> Upload Image
          </Button>
        </FileUpload.Trigger>
        <FileUploadHandler />
      </FileUpload.Root>
    );
  };
  // Handle form submit
  const handleUpload = async () => {
    if (!image) {
      console.warn("No file selected");
      return;
    }

    const payload = {
      municipalityLevel,
      municipalitySector,
      location,
      description,
      image: handleFileChange(image), // send only Base64 string
    };

    console.log("Submitting payload:", payload);

    // TODO: POST payload to your API
  };

  return (
    <ChakraProvider value={system}>
      <Box
        width={"100%"}
        height={"50vw"}
        maxH={"2000px"}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        bgColor={"brand.background"}
      >
        <Card.Root
          minWidth={"xs"}
          width={"lg"}
          alignItems={"center"}
          bg={"brand.onContainer"}
          height={"40vw"}
          maxH={"800px"}
          minH={"xs"}
          p={"5"}
          _hover={{
            shadow: "-1px 20px 50px var(--shadow-color)",
            boxShadowColor: "brand.accents",
          }}
          transition="shadow"
          transitionDuration="slow"
        >
          <Fieldset.Root size="lg" minWidth={"xs"} maxW="md">
            <Stack alignItems={"center"} p={"10"}>
              <Fieldset.Legend alignSelf={"center"}>
                Report Issue
              </Fieldset.Legend>
              <Fieldset.HelperText alignSelf={"center"} minWidth={"xs"}>
                Please upoad necassary info to log your complaint
              </Fieldset.HelperText>
            </Stack>

            {/* Municipality Level */}
            <NativeSelect.Root size="sm" width="md">
              <NativeSelect.Field
                placeholder="Select option"
                value={municipalityLevel}
                outline={"solid"}
                outlineWidth={"1px"}
                outlineColor={"brand.primary"}
                onChange={(e) => setMunicipalityLevel(e.currentTarget.value)}
              >
                <option value="local">Local</option>
                <option value="provincial">Provincial</option>
                <option value="national">National</option>
              </NativeSelect.Field>
            </NativeSelect.Root>

            {/* Municipality Sector */}
            <NativeSelect.Root minWidth={"xs"} size="sm" width="md">
              <NativeSelect.Field
                placeholder="Select option"
                value={municipalitySector}
                onChange={(e) => setMunicipalitySector(e.currentTarget.value)}
                outline={"solid"}
                outlineWidth={"1px"}
                outlineColor={"brand.primary"}
              >
                <option value="health">Health</option>
                <option value="education">Education</option>
                <option value="water">Water and Sanitation</option>
                <option value="transport">Transport</option>
                <option value="safety">Safety and Security</option>
                <option value="social">Social Welfare</option>
              </NativeSelect.Field>
            </NativeSelect.Root>

            <Fieldset.Content>
              <Field.Root>
                <Field.Label>Location</Field.Label>
                <Input
                  variant="outline"
                  bgColor={"brand.input"}
                  color={"brand.primaryText"}
                  outline={"solid"}
                  outlineWidth={"1px"}
                  outlineColor={"brand.primary"}
                  _focus={{ outlineColor: "black" }}
                  name="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>Description</Field.Label>
                <Input
                  variant="outline"
                  bgColor={"brand.input"}
                  color={"brand.primaryText"}
                  outline={"solid"}
                  outlineWidth={"1px"}
                  outlineColor={"brand.primary"}
                  _focus={{ outlineColor: "black" }}
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Field.Root>
            </Fieldset.Content>
            <Flex
              p={"5"}
              justifyContent={"center"}
              gap={"10"}
              alignItems={"flex-start"}
            >
              <ImageUpload />

              <Button type="button" onClick={handleUpload}>
                Submit
              </Button>
            </Flex>
          </Fieldset.Root>
        </Card.Root>
      </Box>
    </ChakraProvider>
  );
}
