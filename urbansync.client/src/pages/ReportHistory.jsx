import {
  Button,
  Box,
  Card,
  ChakraProvider,
  Heading,
  Text,
  Stack,
  HStack,
  VStack,
  Badge,
  Image,
  IconButton,
  Center,
  Flex,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import {
  LuChevronLeft,
  LuChevronRight,
  LuMapPin,
  LuCalendar,
  LuFileText,
} from "react-icons/lu";
import system from "../../chakra.config";

// API endpoint configuration
const API_BASE_URL = "http://localhost:32769/api/reportissue";

export default function MunicipalIssuesList() {
  const [reports, setReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // API call function
  const fetchReports = async (pageNumber, pageSize) => {
    setLoading(true);
    setError(null);

    try {
      const paginationDto = {
        PageNumber: pageNumber,
        PageSize: pageSize,
      };

      const response = await fetch(`${API_BASE_URL}/report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Adjust based on your auth implementation
        },
        body: JSON.stringify(paginationDto),
      });

      if (response.status === 204) {
        // No content - empty result
        setReports([]);
        setTotalPages(0);
        setTotalItems(0);
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Handle the SimpleList response structure
      if (data && Array.isArray(data)) {
        setReports(data);
        // Calculate total pages - you might need to adjust this based on your API response structure
        const calculatedTotalPages = Math.ceil(
          data.length === pageSize ? currentPage + 1 : currentPage
        );
        setTotalPages(calculatedTotalPages);
        setTotalItems(data.length);
      } else {
        setReports([]);
        setTotalPages(0);
        setTotalItems(0);
      }
    } catch (err) {
      console.log(err);
      console.error("Error fetching reports:", err);
      setError(err.message);
      setReports([]);
      setTotalPages(0);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports(currentPage, pageSize);
  }, [currentPage, pageSize]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "yellow";
      case "in progress":
        return "blue";
      case "resolved":
        return "green";
      default:
        return "gray";
    }
  };

  const getSectorIcon = (sector) => {
    switch (sector?.toLowerCase()) {
      case "transport":
        return "🚗";
      case "water and sanitation":
        return "💧";
      case "health":
        return "🏥";
      case "safety and security":
        return "🛡️";
      case "education":
        return "📚";
      case "social":
        return "👥";
      default:
        return "📋";
    }
  };

  if (loading) {
    return (
      <ChakraProvider value={system}>
        <Box
          minHeight="100vh"
          bg="brand.background"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <VStack spacing="4">
            <Box
              width="40px"
              height="40px"
              border="4px solid"
              borderColor="brand.accents"
              borderTopColor="transparent"
              borderRadius="50%"
              animation="spin 1s linear infinite"
            />
            <Text fontSize="lg" color="brand.primary">
              Loading your reported issues...
            </Text>
          </VStack>
        </Box>
      </ChakraProvider>
    );
  }

  if (error) {
    return (
      <ChakraProvider value={system}>
        <Box
          minHeight="100vh"
          bg="brand.background"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Card.Root maxW="md" bg="red.50" borderColor="red.200">
            <Card.Body>
              <VStack spacing="4" textAlign="center">
                <Text fontSize="xl" color="red.600" fontWeight="semibold">
                  Unable to Load Issues
                </Text>
                <Text color="red.500">{error}</Text>
                <Button
                  colorPalette="red"
                  variant="outline"
                  onClick={() => fetchReports(currentPage, pageSize)}
                >
                  Try Again
                </Button>
              </VStack>
            </Card.Body>
          </Card.Root>
        </Box>
      </ChakraProvider>
    );
  }

  return (
    <ChakraProvider value={system}>
      <Box minHeight="100vh" bg="brand.background" py="8" px="4">
        <Box maxW="6xl" mx="auto">
          {/* Header */}
          <VStack spacing="4" mb="8" textAlign="center">
            <Heading size="2xl" color="brand.primary">
              My Reported Issues
            </Heading>
            <Text fontSize="lg" color="gray.600" maxW="2xl">
              Track the status of your municipal service requests and issues
              reported to local government.
            </Text>
          </VStack>

          {/* Issues List */}
          {reports.length === 0 ? (
            <Center py="16">
              <VStack spacing="4">
                <Text fontSize="xl" color="gray.500">
                  No issues reported yet
                </Text>
                <Text color="gray.400">
                  Start by reporting an issue to see it here
                </Text>
                <Button colorPalette="blue" size="lg">
                  Report New Issue
                </Button>
              </VStack>
            </Center>
          ) : (
            <VStack spacing="6">
              {reports.map((report, index) => (
                <Card.Root
                  key={index}
                  w="full"
                  bg="brand.onContainer"
                  shadow="md"
                  _hover={{
                    shadow: "lg",
                    transform: "translateY(-2px)",
                  }}
                  transition="all 0.2s"
                >
                  <Card.Body p="6">
                    <Flex direction={{ base: "column", md: "row" }} gap="6">
                      {/* Image */}
                      <Box flexShrink={0}>
                        {/* Image with error handling */}
                        <Image
                          src={report.Image || report.image}
                          alt="Issue photo"
                          w="200px"
                          h="150px"
                          objectFit="cover"
                          borderRadius="md"
                          border="1px solid"
                          borderColor="gray.200"
                          fallbackSrc="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjdmYWZjIiBzdHJva2U9IiNlMmU4ZjAiLz48dGV4dCB4PSI1MCUiIHk9IjUwJSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjYTBhZGI4IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+Tm8gSW1hZ2U8L3RleHQ+PC9zdmc+"
                        />
                      </Box>

                      {/* Content */}
                      <VStack flex="1" align="stretch" spacing="4">
                        {/* Header with status */}
                        <HStack justify="space-between" wrap="wrap">
                          <HStack>
                            <Text fontSize="lg">
                              {getSectorIcon(
                                report.MunicipalitySector ||
                                  report.municipalitySector ||
                                  ""
                              )}
                            </Text>
                            <Badge
                              colorPalette={getStatusColor(
                                report.Status || report.status
                              )}
                              size="md"
                              variant="solid"
                            >
                              {report.Status || report.status}
                            </Badge>
                            <Badge variant="outline" colorPalette="gray">
                              {report.MunicipalityLevel ||
                                report.municipalityLevel}
                            </Badge>
                          </HStack>
                          <HStack color="gray.500" fontSize="sm">
                            <LuCalendar size="14" />
                            <Text>
                              {report.DateOfCreation
                                ? new Date(
                                    report.DateOfCreation
                                  ).toLocaleDateString()
                                : report.dateOfCreation
                                ? new Date(
                                    report.dateOfCreation
                                  ).toLocaleDateString()
                                : "Date not available"}
                            </Text>
                          </HStack>
                        </HStack>

                        {/* Location */}
                        <HStack color="brand.primary">
                          <LuMapPin size="16" />
                          <Text fontWeight="semibold" fontSize="md">
                            {report.Location ||
                              report.location ||
                              "Location not specified"}
                          </Text>
                        </HStack>

                        {/* Description */}
                        <HStack align="start">
                          <LuFileText
                            size="16"
                            color="gray.500"
                            style={{ marginTop: "2px" }}
                          />
                          <Text color="gray.700" lineHeight="1.6">
                            {report.Description ||
                              report.description ||
                              "No description provided"}
                          </Text>
                        </HStack>

                        {/* Sector */}
                        <HStack>
                          <Text fontSize="sm" color="gray.500">
                            Category:
                          </Text>
                          <Text
                            fontSize="sm"
                            fontWeight="medium"
                            color="brand.primary"
                          >
                            {report.MunicipalitySector ||
                              report.municipalitySector ||
                              "Not specified"}
                          </Text>
                        </HStack>
                      </VStack>
                    </Flex>
                  </Card.Body>
                </Card.Root>
              ))}
            </VStack>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Card.Root mt="8" bg="brand.onContainer">
              <Card.Body>
                <HStack justify="space-between" align="center">
                  <Text color="gray.600" fontSize="sm">
                    {totalPages > 0
                      ? `Page ${currentPage} of ${totalPages} • Showing ${reports.length} issues`
                      : `Showing ${reports.length} issues`}
                  </Text>

                  <HStack spacing="2">
                    <IconButton
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      aria-label="Previous page"
                    >
                      <LuChevronLeft />
                    </IconButton>

                    {/* Page numbers */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <Button
                          key={page}
                          size="sm"
                          variant={page === currentPage ? "solid" : "outline"}
                          colorPalette="blue"
                          onClick={() => handlePageChange(page)}
                          minW="8"
                        >
                          {page}
                        </Button>
                      )
                    )}

                    <IconButton
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      aria-label="Next page"
                    >
                      <LuChevronRight />
                    </IconButton>
                  </HStack>
                </HStack>
              </Card.Body>
            </Card.Root>
          )}
        </Box>
      </Box>
    </ChakraProvider>
  );
}
