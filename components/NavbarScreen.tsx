import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import { useTheme } from "next-themes";
import SunIcon from "./SunIcon";
import MoonIcon from "./MoonIcon";

export default function App() {
  const { setTheme } = useTheme();
  return (
    <Navbar className="bg-green-700">
      <NavbarBrand>
        {/* <AcmeLogo /> */}
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Button isIconOnly onClick={() => setTheme("light")}>
            <SunIcon />
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button isIconOnly onClick={() => setTheme("dark")}>
            <MoonIcon />
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
