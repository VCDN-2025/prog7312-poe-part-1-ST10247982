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
  Flex,
  Image,
  Spinner
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LuFileImage } from "react-icons/lu";
import system from "../../chakra.config";

import { createReportedIssue } from "../api/report.js";
import { useNavigate } from "react-router-dom";

export function ReportIssue() {
  const loadingMessages = [
    "Hang tight! We're logging your issue...",
    "Just a moment! Making sure your report is saved safely...",
    "Our municipal elves are on it! Saving your submission...",
    "Almost done! Your issue is important to us...",
    "Hold on! We're processing your report...",
    "Thanks for your patience! Saving your details...",
    "Your report is on its way to the right hands...",
    "Good things take a moment – we're saving your issue...",
    "Your voice is being heard! Processing now...",
    "Sit tight! We're finalizing your submission...",
  ];
  const navigate = useNavigate();
  const [municipalityLevel, setMunicipalityLevel] = useState("");
  const [municipalitySector, setMunicipalitySector] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const getBase64Data = (base64String) => {
    const commaIndex = base64String.indexOf(",");
    if (commaIndex === -1) {
      return base64String;
    }

    return base64String.slice(commaIndex + 1);
  };
  // Convert file → Base64
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

  // Handle file input change
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const base64 = await toBase64(file);
    setImage({
      name: file.name,
      preview: URL.createObjectURL(file),
      base64,
    });
  };

  // Handle form submit
  const handleUpload = async () => {
    setLoading(true);
    if (!image) {
      console.warn("No file selected");
      return;
    }
    const rawImage = getBase64Data(image.base64);
    const payload = {
      municipalityLevel,
      municipalitySector,
      location,
      description,
      image: rawImage, // send only Base64 string
    };

    console.log("Submitting payload:", payload);
    const { apiSucces, message, status } = await createReportedIssue(payload);
    if (status === 401 || status === 403) {
      setLoading(false);
      navigate("/login");
    }
    if (status >= 200 && status < 300) {
      setSuccess(true);
    } else {
      console.log(message);
    }
    setLoading(false);
  };
  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * loadingMessages.length);
        setCurrentMessage(loadingMessages[randomIndex]);
      }, 3000); // change message every 3 seconds

      return () => clearInterval(interval);
    }
  }, loading);
  if (loading) {
    return (
      <ChakraProvider value={system}>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          width={"100%"}
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
          width="100%"
          minH="60vh"
          height={"60vw"}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          bgColor="brand.background"
          p={5}
        >
          <Card.Root
            minWidth="xs"
            width="lg"
            bg="brand.onContainer"
            p={5}
            _hover={{
              shadow: "-1px 20px 50px var(--shadow-color)",
              boxShadowColor: "brand.accents",
            }}
          >
            <Fieldset.Root size="lg" minWidth="xs" maxW="md">
              <Stack alignItems="center" spacing={4} mb={6}>
                <Fieldset.Legend alignSelf="center">
                  Report Issue
                </Fieldset.Legend>
                <Fieldset.HelperText alignSelf="center" minWidth="xs">
                  Please upload necessary info to log your complaint
                </Fieldset.HelperText>
              </Stack>

              {/* Municipality Level */}
              <NativeSelect.Root size="sm" width="md" mb={4}>
                <NativeSelect.Field
                  placeholder="Select option"
                  value={municipalityLevel}
                  outline="solid"
                  outlineWidth="1px"
                  outlineColor="brand.primary"
                  onChange={(e) => setMunicipalityLevel(e.target.value)}
                >
                  <option value="local">Local</option>
                  <option value="provincial">Provincial</option>
                  <option value="national">National</option>
                </NativeSelect.Field>
              </NativeSelect.Root>

              {/* Municipality Sector */}
              <NativeSelect.Root minWidth="xs" size="sm" width="md" mb={4}>
                <NativeSelect.Field
                  placeholder="Select option"
                  value={municipalitySector}
                  onChange={(e) => setMunicipalitySector(e.target.value)}
                  outline="solid"
                  outlineWidth="1px"
                  outlineColor="brand.primary"
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
                <Field.Root mb={4}>
                  <Field.Label>Location</Field.Label>
                  <Input
                    variant="outline"
                    bgColor="brand.input"
                    color="brand.primaryText"
                    outline="solid"
                    outlineWidth="1px"
                    outlineColor="brand.primary"
                    _focus={{ outlineColor: "black" }}
                    name="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </Field.Root>

                <Field.Root mb={4}>
                  <Field.Label>Description</Field.Label>
                  <Input
                    variant="outline"
                    bgColor="brand.input"
                    color="brand.primaryText"
                    outline="solid"
                    outlineWidth="1px"
                    outlineColor="brand.primary"
                    _focus={{ outlineColor: "black" }}
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Field.Root>
              </Fieldset.Content>

              {/* File Upload and Preview */}
              <Flex alignItems="center" gap={6} flexWrap="wrap">
                <Box>
                  <Button as="label" variant="outline" cursor="pointer">
                    <LuFileImage /> Upload Image
                    <Input
                      type="file"
                      accept="image/*"
                      display="none"
                      onChange={handleFileChange}
                    />
                  </Button>
                </Box>

                {image && (
                  <Box boxSize="150px">
                    <Image
                      src={image.preview}
                      alt={image.name}
                      boxSize="150px"
                      objectFit="cover"
                      borderRadius="md"
                    />
                  </Box>
                )}

                <Button colorScheme="blue" onClick={handleUpload}>
                  Submit
                </Button>
              </Flex>
            </Fieldset.Root>
          </Card.Root>
        </Box>
      </ChakraProvider>
    );
  }
}
