"use client";
import React, { useState } from 'react'
import { useEffect } from "react";
import { Card, CardBody, CardFooter, Image, Button } from "@nextui-org/react";
import Link from "next/link";
import NavigatorGeneral from "@/app/navGeneral/page";
import ModalBudget from "@/components/controller/modal-budge";
import router from "next/navigation";
import { User } from "@nextui-org/react";
import { UserContainer, UserName, WelcomeMessage } from "@/components/style/User-Styles"
import { ContenedorMenuPrincipal } from "../../components/style/Menu-Home"
import { TextoResponsivo } from "@/components/style/Text-responsivo";
import ModalPurshaseList from "@/components/controller/modal-purshaseList"
import CreateShoppingList from "@/components/PurchaseListModalPICHT";
import ModalCreateList from "@/components/controller/modal-createList ";
import BudgetModal from "../test/vista2.2"; // vista de modal con lista de productos que estan en la misma web para luego pasarlos a db
import ShoppingListModal from "../test/vista2";
import ModalInformation from '@/components/controller/modal-information';


export default function PageHome() {
  //const router = useRouter();
  const token = sessionStorage.getItem("token"); // guardian si el token es diferente a token  no le deja ingresar 
  // useEffect(() => {
  //   if (!token) {
  //     alert("no estas autenticado, debes iniciar sesión");
  //     router.push("/login");
  //   }
  // }, [token]);


  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false)  // para manejar los estados

  const openBudgetModal = () => { // una constante que nos dira si esta abierto 
    setIsBudgetModalOpen(true)

  }
  const closeBudgetModal = () => { // una constante que nos dira si esta cerrado 
    setIsBudgetModalOpen(false)
  }


  return (
    <>
      <NavigatorGeneral />


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

              < ModalCreateList />
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

              <ShoppingListModal />

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

            {/* aqui le digo al boton que me abra el bugde modal  */}
            <Button onClick={openBudgetModal} className="text-tiny text-white bg-black/20" variant="flat" color="default" radius="lg" size="sm">

              Open Budget View
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
            <label>

              <ModalInformation />




            </label>
          </CardFooter>
        </Card>
        <BudgetModal isOpen={isBudgetModalOpen} onClose={closeBudgetModal} />
      </ContenedorMenuPrincipal>
    </>
  );
}
function setIsBudgetModalOpen(arg0: boolean) {
  throw new Error("Function not implemented.");
}

