import { Flex, Avatar, Button, Card, Box, Center } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { DashboardCard } from "../components/DashBoardCard";
import { useAuth } from "../authContext.jsx";
export function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  return (
    <>
      <Box width={"100%"} bgColor={"brand.background"} height={"50vw"}>
        <Flex gap={"20"} justifyContent={"center"} p={"20"}>
          {/* Report or Track Issue Card */}
          <Card.Root
            width="320px"
            bgColor={"brand.onContainer"}
            _hover={{
              shadow: "-1px 20px 50px var(--shadow-color)",
              boxShadowColor: "brand.primary",
            }}
            transition="shadow"
            transitionDuration="slow"
            backdropBlur={"md"}
          >
            <Card.Body gap="2">
              <Avatar.Root size="lg" shape="rounded">
                <Avatar.Image src="https://picsum.photos/200/301" />
                <Avatar.Fallback name="Report Issue" />
              </Avatar.Root>
              <Card.Title mt="2">Report or Track Issue</Card.Title>
              <Card.Description>
                Submit a new issue or track the status of your existing reports
                in your locality.
              </Card.Description>
            </Card.Body>
            <Card.Footer justifyContent="flex-end">
              <Button
                variant="outline"
                onClick={() => {
                  if (isAuthenticated) {
                    navigate("/report");
                  } else {
                    navigate("/login");
                  }
                }}
              >
                Report Issue
              </Button>
              <Button
                onClick={() => {
                  if (isAuthenticated) {
                    navigate("/report");
                  } else {
                    navigate("/login");
                  }
                }}
              >
                Track Issues
              </Button>
            </Card.Footer>
          </Card.Root>
          {/* Local Events & Announcements Card (Disabled) */}
          <Card.Root
            width="320px"
            _hover={{
              shadow: "-1px 20px 50px var(--shadow-color)",
              boxShadowColor: "brand.primary",
            }}
            transition="shadow"
            transitionDuration="slow"
            backdropBlur={"md"}
          >
            <Card.Body gap="2">
              <Avatar.Root size="lg" shape="rounded">
                <Avatar.Fallback name="Events" />
              </Avatar.Root>
              <Card.Title mt="2">Local Events & Announcements</Card.Title>
              <Card.Description>
                Stay updated with upcoming events and important announcements in
                your area.
              </Card.Description>
            </Card.Body>
            <Card.Footer justifyContent="flex-end">
              <Button variant="outline" disabled={true}>
                View Events
              </Button>
              <Button disabled={true}>Announcements</Button>
            </Card.Footer>
          </Card.Root>
          {/* Service Request Status Card (Disabled) */}
          <Card.Root
            width="320px"
            _hover={{
              shadow: "-1px 20px 50px var(--shadow-color)",
              boxShadowColor: "brand.primary",
            }}
            transition="shadow"
            transitionDuration="slow"
            backdropBlur={"md"}
          >
            <Card.Body gap="2">
              <Avatar.Root size="lg" shape="rounded">
                <Avatar.Image src="https://picsum.photos/200/303" />
                <Avatar.Fallback name="Service Status" />
              </Avatar.Root>
              <Card.Title mt="2">Service Request Status</Card.Title>
              <Card.Description>
                Check the status of your service requests and get timely
                updates.
              </Card.Description>
            </Card.Body>
            <Card.Footer justifyContent="flex-end">
              <Button variant="outline" disabled={true}>
                View Status
              </Button>
              <Button disabled={true}>Request Service</Button>
            </Card.Footer>
          </Card.Root>
        </Flex>
        <Center>
          {" "}
          <DashboardCard />
        </Center>
      </Box>
    </>
  );
}
