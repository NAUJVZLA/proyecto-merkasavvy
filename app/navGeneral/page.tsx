import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
} from "@nextui-org/react";
import {
  ChevronDown,
  Lock,
  Activity,
  Flash,
  Server,
  TagUser,
  Scale,
} from "../../components/types/icons/iconos-nav";
import { MerkaSavvy } from "../../components/types/svg/logo";
import { useRouter } from "next/navigation"
import { ThemeSwitcher } from "@/components/controller/ThemeSwitcher";
import { UserContainer, UserName, WelcomeMessage } from "@/components/style/User-Styles"
import { User } from "@nextui-org/react";
import { UserRound } from "lucide-react";
import { ContenedorDatosNav, ContenedorLogoName } from "@/components/style/ContenedorDatosNAV";

export default function NavigatorGeneral() {
  const token = sessionStorage.getItem("token");
  const icons = {
    chevron: <ChevronDown fill="currentColor" size={16} />,
    scale: <Scale className="text-warning" fill="currentColor" size={30} />,
    lock: <Lock className="text-success" fill="currentColor" size={30} />,
    activity: (
      <Activity className="text-secondary" fill="currentColor" size={30} />
    ),
    flash: <Flash className="text-primary" fill="currentColor" size={30} />,
    server: <Server className="text-success" fill="currentColor" size={30} />,
    user: <TagUser className="text-danger" fill="currentColor" size={30} />,
  };

  const router = useRouter()

  const handleLogout = () => {
    sessionStorage.removeItem('token')
    router.push('/login')
  }




  return (
    <Navbar>
      <NavbarBrand >

        <ContenedorDatosNav>

          <ContenedorLogoName>
            <MerkaSavvy />
            <Link href="home">
              <p className="font-bold text-inherit">-MerkaSavvy</p>
            </Link>
          </ContenedorLogoName>
          <UserContainer>
            <User
              name={token}
              avatarProps={
                <UserRound />
              }
            />
          </UserContainer>

        </ContenedorDatosNav>

        <WelcomeMessage>
          <b>Bienvenido {token}</b>
        </WelcomeMessage>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button color="primary" variant="flat" onClick={handleLogout}>
            Log Out
          </Button>

        </NavbarItem>
        <ThemeSwitcher />
      </NavbarContent>
    </Navbar>
  );
}
