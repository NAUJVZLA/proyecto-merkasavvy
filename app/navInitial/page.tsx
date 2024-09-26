import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";
import { MerkaSavvy } from "../../components/types/svg/logo";
import Switcher from "@/components/controller/swichtBoton/swich";

export default function NavigatorComponent() {
  return (
    <Navbar>
      <NavbarBrand>
        <MerkaSavvy />
        <Link href="home">
          <p className="font-bold text-inherit">-MerkaSavvy</p>
        </Link>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/login">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/register"> Register</Link>

        </NavbarItem>
        <Switcher />
      </NavbarContent>
    </Navbar>
  );
}
