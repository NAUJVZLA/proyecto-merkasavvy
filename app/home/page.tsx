"use client";
import React from "react";
import { useEffect } from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Nav from "../navGeneral/page";
import ModalBudget from "@/components/controller/modal-budge";

export default function PageHome() {
  //const router = useRouter();
  const token = sessionStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      alert("no estas autenticado, debes iniciar sesión");
      router.push("/login");
    }
  }, []);

  return (
    <>
      <Nav />
      <h1>
        <b>Bienvenido {token}</b>
      </h1>
      <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
        <Card shadow="sm">
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              height="100%"
              alt="icono"
              className="w-full object-cover h-[140px]"
              src="/assets/CREATE LIST.jpeg"
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>Create List</b>
            <Link href="/products-dashboard">
              <button className="text-default-500">
                Go{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-move-right"
                >
                  <path d="M18 8L22 12L18 16" />
                  <path d="M2 12H22" />
                </svg>
              </button>
            </Link>
          </CardFooter>
        </Card>
        <Card shadow="sm">
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              height="100%"
              alt="icono"
              className="w-full object-cover h-[140px]"
              src="/assets/PURCHASE LIST.jpeg"
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>Purchase List</b>
            <Link href="/purchase-list">
              <button className="text-default-500">
                Go{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-move-right"
                >
                  <path d="M18 8L22 12L18 16" />
                  <path d="M2 12H22" />
                </svg>
              </button>
            </Link>
          </CardFooter>
        </Card>
        <Card shadow="sm">
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              height="100%"
              alt="icono"
              className="w-full object-cover h-[140px]"
              src="/assets/BUDGET.jpeg"
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>Budget</b>
            {/* <Link href="/budget">
              <button className="text-default-500">
                {" "}
               {" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-move-right"
                >
                  <path d="M18 8L22 12L18 16" />
                  <path d="M2 12H22" />
                </svg>
              </button>
            </Link> */}
            <ModalBudget />
          </CardFooter>
        </Card>
        <Card shadow="sm">
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              height="100%"
              alt="icono"
              className="w-full object-cover h-[140px]"
              src="/assets/INFORMATION.jpeg"
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <Link href="/information">
              <b>Information</b>
              <button className="text-default-500">
                Go{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="lucide lucide-move-right"
                >
                  <path d="M18 8L22 12L18 16" />
                  <path d="M2 12H22" />
                </svg>
              </button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
