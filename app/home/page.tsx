"use client";
import React from "react";
import { Card, CardBody, CardFooter, Image } from "@nextui-org/react";
import Imagen from "@/components/types/svg/image"; // para zoom pendiente por implementar

export default function Home() {
  const list = [
    {
      title: "Create List",
      img: "https://nextui.org/images/fruit-1.jpeg",
      price: "$5.50",
    },
    {
      title: "My Lists",
      img: "https://nextui.org/images/fruit-2.jpeg",
      price: "$3.00",
    },
    {
      title: "Budget",
      img: "https://nextui.org/images/fruit-3.jpeg",
      price: "$10.00",
    },
    {
      title: "Information",
      img: "https://nextui.org/images/fruit-4.jpeg",
      price: "$5.30",
    }
  ];

  return (
    <div className="gap-2 grid grid-cols-2 sm:grid-cols-2">
      {list.map((item, index) => (
        <Card
          shadow="sm"
          key={index}
          isPressable
        >
          <CardBody className="overflow-visible p-0">
            <Image
              shadow="sm"
              radius="lg"
              width="100%"
              height="50vh"
              alt={item.title}
              className="w-full object-cover h-[140px]"
              src="/assets/BUDGET.jpeg"
            />
          </CardBody>
          <CardFooter className="text-small justify-between">
            <b>{item.title}</b>
            <p className="text-default-500">{item.price}</p>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
