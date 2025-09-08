import { Flex, Avatar, Button, Card } from "@chakra-ui/react";
import { useNavigate } from "react-router";
export function Home() {
  return (
    <>
      <Flex gap={"20"} justifyContent={"center"} p={"20"}>
        <Card.Root width="320px">
          <Card.Body gap="2">
            <Avatar.Root size="lg" shape="rounded">
              <Avatar.Image src="https://picsum.photos/200/300" />
              <Avatar.Fallback name="Nue Camp" />
            </Avatar.Root>
            <Card.Title mt="2">Nue Camp</Card.Title>
            <Card.Description>
              This is the card body. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Curabitur nec odio vel dui euismod fermentum.
              Curabitur nec odio vel dui euismod fermentum.
            </Card.Description>
          </Card.Body>
          <Card.Footer justifyContent="flex-end">
            <Button  variant="outline">View</Button>
            <Button>Join</Button>
          </Card.Footer>
        </Card.Root>
        <Card.Root width="320px">
          <Card.Body gap="2">
            <Avatar.Root size="lg" shape="rounded">
              <Avatar.Image src="https://picsum.photos/200/300" />
              <Avatar.Fallback name="Nue Camp" />
            </Avatar.Root>
            <Card.Title mt="2">Nue Camp</Card.Title>
            <Card.Description>
              This is the card body. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Curabitur nec odio vel dui euismod fermentum.
              Curabitur nec odio vel dui euismod fermentum.
            </Card.Description>
          </Card.Body>
          <Card.Footer justifyContent="flex-end">
            <Button variant="outline">View</Button>
            <Button>Join</Button>
          </Card.Footer>
        </Card.Root>
        <Card.Root width="320px">
          <Card.Body gap="2">
            <Avatar.Root size="lg" shape="rounded">
              <Avatar.Image src="https://picsum.photos/200/300" />
              <Avatar.Fallback name="Nue Camp" />
            </Avatar.Root>
            <Card.Title mt="2">Nue Camp</Card.Title>
            <Card.Description>
              This is the card body. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Curabitur nec odio vel dui euismod fermentum.
              Curabitur nec odio vel dui euismod fermentum.
            </Card.Description>
          </Card.Body>
          <Card.Footer justifyContent="flex-end">
            <Button variant="outline" _enabled={"false"}>
              View
            </Button>
            <Button _enabled={"false"}>Join</Button>
          </Card.Footer>
        </Card.Root>
      </Flex>
    </>
  );
}
