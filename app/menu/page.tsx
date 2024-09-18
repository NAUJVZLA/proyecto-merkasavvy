import MenuP from "@/components/controller/catalogo/catalogo-menu";
import {Suspense} from 'react'
//import { div } from "framer-motion/client";
import Nav from "../navGeneral/page"

export default function MenuOpcion() {
  return (
    <>
    <Nav/>
     <div>
      <Suspense fallback={<div>Loading...</div>}>
        <MenuP/>
      </Suspense>      
    </div>
    </>   
  );
}
