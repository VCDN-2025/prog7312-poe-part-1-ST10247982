import { Flex, Avatar, Button, Card } from "@chakra-ui/react";
import { useNavigate } from "react-router";
export function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Flex gap={"20"} justifyContent={"center"} p={"20"}>
        {/* Report or Track Issue Card */}
        <Card.Root width="320px">
          <Card.Body gap="2">
            <Avatar.Root size="lg" shape="rounded">
              <Avatar.Image src="https://picsum.photos/200/301" />
              <Avatar.Fallback name="Report Issue" />
            </Avatar.Root>
            <Card.Title mt="2">Report or Track Issue</Card.Title>
            <Card.Description>
              Submit a new issue or track the status of your existing reports in
              your locality.
            </Card.Description>
          </Card.Body>
          <Card.Footer justifyContent="flex-end">
            <Button variant="outline" onClick={() => navigate("/report")}>
              Report Issue
            </Button>
            <Button onClick={() => navigate("/reports")}>
              Track Issues
            </Button>
          </Card.Footer>
        </Card.Root>
        {/* Local Events & Announcements Card (Disabled) */}
        <Card.Root width="320px">
          <Card.Body gap="2">
            <Avatar.Root size="lg" shape="rounded">
              <Avatar.Image src="https://picsum.photos/200/302" />
              <Avatar.Fallback name="Events" />
            </Avatar.Root>
            <Card.Title mt="2">Local Events & Announcements</Card.Title>
            <Card.Description>
              Stay updated with upcoming events and important announcements in
              your area.
            </Card.Description>
          </Card.Body>
          <Card.Footer justifyContent="flex-end">
            <Button variant="outline" isDisabled>
              View Events
            </Button>
            <Button isDisabled>Announcements</Button>
          </Card.Footer>
        </Card.Root>
        {/* Service Request Status Card (Disabled) */}
        <Card.Root width="320px" enab>
          <Card.Body gap="2">
            <Avatar.Root size="lg" shape="rounded">
              <Avatar.Image src="https://picsum.photos/200/303" />
              <Avatar.Fallback name="Service Status" />
            </Avatar.Root>
            <Card.Title mt="2">Service Request Status</Card.Title>
            <Card.Description>
              Check the status of your service requests and get timely updates.
            </Card.Description>
          </Card.Body>
          <Card.Footer justifyContent="flex-end">
            <Button variant="outline" isDisabled>
              View Status
            </Button>
            <Button isDisabled>Request Service</Button>
          </Card.Footer>
        </Card.Root>
      </Flex>
    </>
  );
}
