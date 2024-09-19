'use client'

import React, { useState } from "react"; // Importa React y el hook useState
import { useRouter } from "next/navigation"; // Importa el hook useRouter para la navegación programática
import { User, Lock, Mail } from "lucide-react";
import Link from "next/link";
import Logoregister from "@/components/types/icons/logo-register";
import Nav from "../navInitial/page"
import {
  ContenedorLoginRegister,
  LoginForm,
  GreenBackground,
  Tituloh1,
  WelcomeBack,
  SignUpH2,
  InputGroup,
  InputsLabels,
  InputWithIcon,
  Inputs,
  Icon,
  ForgotPassword,
  SignInButton,
  SignInLink
} from '../../components/style/Login-Register-Styles';
import { ToastContainer, toast } from "react-toastify";

const RegisterComponent: React.FC = () => {
  const [email, setEmail] = useState(""); // Estado para almacenar el email
  const [password, setPassword] = useState(""); // Estado para almacenar la contraseña
  const [name, setName] = useState("")
  const router = useRouter(); // Inicializa el router para la navegación


  const handleSubmit = async (e: React.FormEvent) => { // Función para manejar el envío del formulario
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    if (!email || !password) {
      toast.error("Debes Llenar Los Campos", {
        position: "top-right",
        autoClose: 3000,
      });
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
      <Nav />

      <ContenedorLoginRegister>
        <LoginForm >
          <SignUpH2 >MerkaSavvy</SignUpH2>
          <WelcomeBack >Welcome !!!</WelcomeBack>
          <Tituloh1 >Sign up</Tituloh1>
          <form id="animation" onSubmit={handleSubmit}>
            <InputGroup >
              <InputsLabels htmlForm="email">Name</InputsLabels>
              <InputWithIcon >
                <Inputs
                  type="string"
                  id="name"
                  placeholder="Name"
                  value={name} // Valor del input vinculado al estado email
                  onChange={(e) => setName(e.target.value)} // Actualiza el estado email al cambiar
                />
                <Icon>
                  <User id="name" className="icon" size={20} />
                </Icon>

              </InputWithIcon>
            </InputGroup>
            <InputGroup>
              <InputsLabels htmlForm="email">Email</InputsLabels>
              <InputWithIcon>
                <Inputs
                  type="email"
                  id="email"
                  placeholder="test@gmail.com"
                  value={email} // Valor del input vinculado al estado email
                  onChange={(e) => setEmail(e.target.value)} // Actualiza el estado email al cambiar
                />
                <Icon>
                  <Mail id="user" className="icon" size={20} />
                </Icon>
              </InputWithIcon>
            </InputGroup>
            <InputGroup >
              <InputsLabels htmlForm="password">Password</InputsLabels>
              <InputWithIcon >
                <Inputs
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  value={password} // Valor del input vinculado al estado password
                  onChange={(e) => setPassword(e.target.value)} // Actualiza el estado password al cambiar
                />
                <Icon>
                  <Lock id="candado" className="icon" size={20} />
                </Icon>
              </InputWithIcon>
            </InputGroup>
            <SignInButton type="submit">
              SIGN UP →
            </SignInButton>
          </form>
          <Link className="sign-in-link" href="login">
            I have an account? Sign In
          </Link>
        </LoginForm>
        <GreenBackground >
          <div className="vector-container">
            <Logoregister />
          </div>
        </GreenBackground>
        <ToastContainer />
      </ContenedorLoginRegister>
    </>
  );
};

export default RegisterComponent;
