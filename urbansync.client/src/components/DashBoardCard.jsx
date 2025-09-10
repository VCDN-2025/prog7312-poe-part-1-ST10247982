import { Box, Heading, Text, Stack, Card, Flex } from "@chakra-ui/react";

export function DashboardCard() {
  // Fake data
  const data = {
    totalUsers: 1245,
    municipalityLevels: {
      local: 512,
      provincial: 398,
      national: 335,
    },
  };

  return (
    <Card.Root width={"60%"} bgColor={"black"} p={10}>
      <Stack spacing={8} align="center">
        {/* Title */}
        <Heading size="lg" color="brand.primary">
          System Dashboard
        </Heading>

        {/* Stats Row */}
        <Flex
          justify="space-around"
          width="100%"
          textAlign="center"
          gap={10}
          flexWrap="wrap"
        >
          {/* Total Users */}
          <Box>
            <Text fontSize="4xl" fontWeight="bold" color="brand.accents">
              {data.totalUsers}
            </Text>
            <Text fontSize="sm" color="white">
              Total Users
            </Text>
          </Box>

          {/* Local */}
          <Box>
            <Text fontSize="4xl" fontWeight="bold" color="brand.accents">
              {data.municipalityLevels.local}
            </Text>
            <Text fontSize="sm" color="white">
              Local
            </Text>
          </Box>

          {/* Provincial */}
          <Box>
            <Text fontSize="4xl" fontWeight="bold" color="brand.accents">
              {data.municipalityLevels.provincial}
            </Text>
            <Text fontSize="sm" color="white">
              Provincial
            </Text>
          </Box>

          {/* National */}
          <Box>
            <Text fontSize="4xl" fontWeight="bold" color="brand.accents">
              {data.municipalityLevels.national}
            </Text>
            <Text fontSize="sm" color="white">
              National
            </Text>
          </Box>
        </Flex>

        {/* Footer */}
        <Text fontSize="sm" color="white" textAlign="center">
          Updated just now
        </Text>
      </Stack>
    </Card.Root>
  );
}
