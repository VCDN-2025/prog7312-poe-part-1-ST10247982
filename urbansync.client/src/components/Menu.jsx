import { Button, Menu, Portal } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const MainMenu = ({ isLoggedIn }) => {
  const navigate = useNavigate();
  if (isLoggedIn) {
    return (
      <Menu.Root>
        <Menu.Trigger asChild bgColor={"brand.primary"} color={"white"}>
          <Button variant="subtle">Menu</Button>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.ItemGroup>
                <Menu.ItemGroupLabel>Options</Menu.ItemGroupLabel>
                <Menu.Item value="profile" disabled={true}>
                  Profile
                </Menu.Item>
                <Menu.Item value="settings" disabled={true}>
                  Settings
                </Menu.Item>
              </Menu.ItemGroup>
              <Menu.Separator />
              <Menu.ItemGroup>
                <Menu.Item value="logout" color={"red"}>
                  Logout
                </Menu.Item>
              </Menu.ItemGroup>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    );
  } else {
    return (
      <Menu.Root positioning={{ placement: "left-start" }}>
        <Menu.Trigger asChild bgColor={"brand.primary"} color={"white"}>
          <Button variant="subtle" size="sm">
            Menu
          </Button>
        </Menu.Trigger>
        <Portal>
          <Menu.Positioner>
            <Menu.Content>
              <Menu.Item
                value="login"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </Menu.Item>
              <Menu.Item
                value="register"
                onClick={() => {
                  navigate("/register");
                }}
              >
                Register
              </Menu.Item>
              <Menu.Item
                value="about"
                onClick={navigate("/about")}
                disabled={true}
              >
                About Us
              </Menu.Item>
            </Menu.Content>
          </Menu.Positioner>
        </Portal>
      </Menu.Root>
    );
  }
};
