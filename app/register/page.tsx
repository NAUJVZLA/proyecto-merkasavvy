'use client'

import React, { useState} from "react"; // Importa React y el hook useState
import { useRouter } from "next/navigation"; // Importa el hook useRouter para la navegación programática
import { User, Lock, Mail } from "lucide-react";
import Link from "next/link";
import Logoregister from "@/components/types/icons/logo-register";
import Nav from "../navInitial/page"

const RegisterComponent: React.FC = () => {
  const [email, setEmail] = useState(""); // Estado para almacenar el email
  const [password, setPassword] = useState(""); // Estado para almacenar la contraseña
  const [name, setName] = useState("")
  const router = useRouter(); // Inicializa el router para la navegación


  const handleSubmit = async (e: React.FormEvent) => { // Función para manejar el envío del formulario
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    if(!email || !password){
      alert("debes diligenciar todos los datos")
      return
    }
    const fetchData = async () => {
      const response = await fetch("http://localhost:5000/usuarios", { // Cambia la URL si es necesario
        method: "POST", // Método POST para enviar datos
        headers: {
          "Content-Type": "application/json", // Indica el tipo de contenido
        },
        body: JSON.stringify({ email, password, name }), // Convierte el objeto a JSON
      });
      
      setEmail(""); // Limpia el campo de email
      setPassword(""); // Limpia el campo de contraseña
      setName("");

      alert("Cuenta creada")
      router.push('/login')
    };  
    await fetchData();       
};

  return (
    <>
    <Nav/>
    <div className="login-container"> 
    <div className="login-form"> 
      <h2 className="app-name">MerkaSavvy</h2> 
      <p className="welcome-back">Welcome !!!</p> 
      <h1 className="sign-up">Sign up</h1> 
      <form id="animation" onSubmit={handleSubmit}> 
      <div className="input-group"> 
          <label htmlFor="email">Name</label> 
          <div className="input-with-icon"> 
            <input
              type="text"
              id="name"
              placeholder="Jon Doe"
              value={name} // Valor del input vinculado al estado email
              onChange={(e) => setName(e.target.value)} // Actualiza el estado email al cambiar
            />
            <User id="name" className="icon" size={20} /> 
          </div>
        </div>
        <div className="input-group"> 
          <label htmlFor="email">Email</label> 
          <div className="input-with-icon"> 
            <input
              type="email"
              id="email"
              placeholder="test@gmail.com"
              value={email} // Valor del input vinculado al estado email
              onChange={(e) => setEmail(e.target.value)} // Actualiza el estado email al cambiar
            />
            <Mail id="user" className="icon" size={20} /> 
          </div>
        </div>
        <div className="input-group"> 
          <label htmlFor="password">Password</label> 
          <div className="input-with-icon"> 
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password} // Valor del input vinculado al estado password
              onChange={(e) => setPassword(e.target.value)} // Actualiza el estado password al cambiar
            />
            <Lock id="candado" className="icon" size={20} /> 
          </div>
        </div>
        <button type="submit" className="sign-in-button"> 
          SIGN UP →
        </button>
      </form>
      <Link className="sign-in-link" href="login"> 
        I have an account? Sign In
      </Link>
    </div>
    <div className="green-background"> 
      <div className="vector-container"> 
        <Logoregister /> 
      </div>
    </div>
  </div>
  </>
  );
};

export default RegisterComponent;
