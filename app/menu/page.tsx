import MenuP from "@/components/controller/catalogo/catalogo-menu";
import {Suspense} from 'react'
//import { div } from "framer-motion/client";
export default function MenuOpcion() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <MenuP/>
      </Suspense>
      
    </div>
  );
}
