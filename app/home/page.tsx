"use client";
import React from "react";
import { useEffect } from "react";
import { Card, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import Link from "next/link";
import Nav from "../navGeneral/page";
import ModalBudget from "@/components/controller/modal-budge";
import router from "next/navigation";
import { User } from "@nextui-org/react";
import { UserContainer, UserName, WelcomeMessage } from "@/components/style/User-Styles"
import { ContenedorMenuPrincipal } from "../../components/style/Menu-Home"
import { UserRound } from "lucide-react";
import { TextoResponsivo } from "@/components/style/Text-responsivo";




export default function PageHome() {
  //const router = useRouter();
  const token = sessionStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      alert("no estas autenticado, debes iniciar sesión");
      router.push("/login");
    }
  }, [token]);

  return (
    <>
      <Nav />
      <UserContainer>
        <User
          name={token}
          avatarProps={
            <UserRound />
          }
        />
      </UserContainer>

      <WelcomeMessage>
        <b>Bienvenido {token}</b>
      </WelcomeMessage>

      <ContenedorMenuPrincipal >
        <Card
          isFooterBlurred
          radius="lg"
          className="border-none"
        >
          <Image
            alt="List of Menus"
            className="object-cover"
            height="auto"
            src="/assets/CREATELIST.jpg"
            width="auto"
          />
          <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
            <TextoResponsivo >Create List</TextoResponsivo>
            <Button className="text-tiny text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm">
              <Link href="/products-dashboard" >
                Create List
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card
          isFooterBlurred
          radius="lg"
          className="border-none"
        >
          <Image
            alt="List of Menus"
            className="object-cover"
            height="auto"
            src="/assets/1PURCHASE LIST.jpg"
            width="auto"
          />
          <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
            <TextoResponsivo >Purchase List</TextoResponsivo>
            <Button className="text-tiny text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm">
              <Link href="/purchase-list">
                Create List
              </Link>
            </Button>
          </CardFooter>
        </Card>

        <Card
          isFooterBlurred
          radius="lg"
          className="border-none"
        >
          <Image
            alt="List of Menus"
            className="object-cover"
            height="auto"
            src="/assets/budget.jpg"
            width="auto"
          />
          <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
            <TextoResponsivo >Budget</TextoResponsivo>
            <Button className="text-tiny text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm">

              <ModalBudget />

            </Button>
          </CardFooter>
        </Card>





        <Card
          isFooterBlurred
          radius="lg"
          className="border-none"
        >
          <Image
            alt="List of Menus"
            className="object-cover"
            height="auto"
            src="/assets/information.jpg"
            width="auto"
          />
          <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
            <TextoResponsivo >Information</TextoResponsivo>
            <Button className="text-tiny text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm">

              <ModalBudget />

            </Button>
          </CardFooter>
        </Card>

      </ContenedorMenuPrincipal>
    </>
  );
}
