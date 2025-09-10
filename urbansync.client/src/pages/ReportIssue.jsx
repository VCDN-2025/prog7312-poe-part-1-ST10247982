import {
  Button,
  Field,
  Fieldset,
  Box,
  Input,
  NativeSelect,
  Stack,
  FileUpload,
  Icon,
  Card,
  ChakraProvider,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useState } from "react";
import { LuUpload } from "react-icons/lu";
import system from "../../chakra.config";

export function ReportIssue() {
  const [municipalityLevel, setMunicipalityLevel] = useState("");
  const [municipalitySector, setMunicipalitySector] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  // Store images in base64 + preview
  const [images, setImages] = useState([]);

  // Convert file → base64
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

  // Handle file upload
  const handleFiles = async (files) => {
    const base64Files = await Promise.all(
      
      files.map(async (file) => ({
        name: file.name,
        preview: URL.createObjectURL(file),
        base64: await toBase64(file),
      }))
    );
    setImages(base64Files);
  };

  // Handle form submit
  const handleUpload = async (e) => {
    const payload = {
      municipalityLevel,
      municipalitySector,
      location,
      description,
      images: images.map((img) => img.base64), // send only base64
    };
    
    console.log(images.map((img) => img.base64));
    // Example: POST request
  };

  return (
    <ChakraProvider value={system}>
      <Box
        width={"100vw"}
        height={"80vw"}
        maxH={"2000px"}
        justifyContent={"center"}
        alignItems={"center"}
        display={"flex"}
        flexDirection={"column"}
        bgColor={"brand.background"}
      >
        <Card.Root
          minWidth={"xs"}
          width={"lg"}
          alignItems={"center"}
          bg={"brand.onContainer"}
          height={"55vw"}
          maxH={"800px"}
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
          <Fieldset.Root size="lg" minWidth={"xs"} maxW="md">
            <Stack>
              <Fieldset.Legend alignSelf={"center"}>
                Contact details
              </Fieldset.Legend>
              <Fieldset.HelperText alignSelf={"center"} minWidth={"xs"}>
                Please provide your contact details below.
              </Fieldset.HelperText>
            </Stack>

            {/* Municipality Level */}
            <NativeSelect.Root size="sm" width="md">
              <NativeSelect.Field
                placeholder="Select option"
                value={municipalityLevel}
                onChange={(e) => setMunicipalityLevel(e.currentTarget.value)}
              >
                <option value="local">Local</option>
                <option value="provincial">Provincial</option>
                <option value="national">National</option>
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>

            {/* Municipality Sector */}
            <NativeSelect.Root minWidth={"xs"} size="sm" width="md">
              <NativeSelect.Field
                placeholder="Select option"
                value={municipalitySector}
                onChange={(e) => setMunicipalitySector(e.currentTarget.value)}
              >
                <option value="health">Health</option>
                <option value="education">Education</option>
                <option value="water">Water and sanitation</option>
                <option value="transport">Transport</option>
                <option value="safety">Safety and Security</option>
                <option value="social">Social welfare</option>
              </NativeSelect.Field>
              <NativeSelect.Indicator />
            </NativeSelect.Root>

            <Fieldset.Content>
              <Field.Root>
                <Field.Label>Location</Field.Label>
                <Input
                  variant={"subtle"}
                  name="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </Field.Root>
              <Field.Root>
                <Field.Label>Description</Field.Label>
                <Input
                  variant={"subtle"}
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Field.Root>
            </Fieldset.Content>

            {/* File Upload */}
            <FileUpload.Root
              maxW="md"
              alignItems="stretch"
              maxFiles={10}
              onFileChange={(files) => handleFiles(files)}
            >
              <FileUpload.HiddenInput />
              <FileUpload.Dropzone>
                <Icon size="md" color="fg.muted">
                  <LuUpload />
                </Icon>
                <FileUpload.DropzoneContent>
                  <Box>Drag and drop files here</Box>
                  <Box color="fg.muted">.png, .jpg up to 5MB</Box>
                </FileUpload.DropzoneContent>
              </FileUpload.Dropzone>
              <FileUpload.List clearable={true} />
            </FileUpload.Root>

            {/* Image Preview */}
            <Stack direction="row" wrap="wrap" mt="4" spacing="4">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img.preview}
                  alt={img.name}
                  style={{ width: "120px", borderRadius: "8px" }}
                />
              ))}
            </Stack>

            <Button
              type="button"
              onClick={handleUpload}
              alignSelf="center"
              mt="4"
            >
              Submit
            </Button>
          </Fieldset.Root>

          <Wrap spacing="12px">
            {images.map((img, idx) => (
              <WrapItem key={idx}>
                <img
                  src={img.preview}
                  alt={img.name}
                  style={{ width: "100px", borderRadius: "8px" }}
                />
              </WrapItem>
            ))}
          </Wrap>
        </Card.Root>
      </Box>
    </ChakraProvider>
  );
}
