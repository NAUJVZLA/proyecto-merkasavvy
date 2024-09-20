"use client"; // Indica que este componente se ejecuta en el cliente

import React, { useState } from "react"; // Importa React y el hook useState
import { User, Lock } from "lucide-react"; // Importa íconos de lucide-react
import Link from "next/link"; // Importa el componente Link de Next.js para la navegación
import { useRouter } from "next/navigation"; // Importa el hook useRouter para la navegación programática
import Logologin from "@/components/types/icons/logo-login"; // Importa un componente de logo
import { ToastContainer, toast } from "react-toastify"; // Importa ToastContainer y toast
import "react-toastify/dist/ReactToastify.css"; // Importa estilos de react-toastify
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



const LoginComponent: React.FC = () => {
  // Define el componente funcional LoginComponent
  const [email, setEmail] = useState(""); // Estado para almacenar el email
  const [password, setPassword] = useState(""); // Estado para almacenar la contraseña
  const router = useRouter(); // Inicializa el router para la navegación

  const handleSubmit = async (e: React.FormEvent) => {
    // Función para manejar el envío del formulario
    e.preventDefault(); // Previene el comportamiento por defecto del formulario

    const fetchData = async () => {
      const getData = await fetch("http://localhost:5000/auth/login",{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }); // Espera a que se resuelva la promesa
      const data = await getData.json(); // Llama a .json() después de que se resuelva
      console.log(data)
      const user = (data.email === email && data.password === password) ? data : null;

      if (getData.ok) { // Verifica si la respuesta fue exitosa
        // Guarda el token o el identificador de usuario
        sessionStorage.setItem('token', data.token); // Ajusta según tu respuesta
        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 3000,
        });
        setTimeout(() => {
          router.push("/home");
        }, 3000);
      } else {
        toast.error(data.message || "Invalid credentials, please try again", {
          position: "top-right",
          autoClose: 3000,
        });
      }
    
      setEmail("");
      setPassword("");
    };

    await fetchData();
  };

  return (
    // Renderiza el componente
    <>
      <Nav />
      <ContenedorLoginRegister >
        <LoginForm >
          <SignUpH2 >MerkaSavvy</SignUpH2>
          <WelcomeBack >Welcome back !!!</WelcomeBack>
          <Tituloh1>Log in</Tituloh1>
          <form id="animation" onSubmit={handleSubmit}>
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
                  <User id="user" className="icon" size={20} />
                </Icon>

              </InputWithIcon>
            </InputGroup>
            <InputGroup>
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
              <ForgotPassword href="#">
                Forgot Password?
              </ForgotPassword>
            </InputGroup>
            <SignInButton type="submit" >
              SIGN IN →
            </SignInButton>
          </form>

          <Link className="sign-in-link" href="register">
            I dont have an account? Sign Up
          </Link>
        </LoginForm>
        <GreenBackground >
          <div className="vector-container">
            <Logologin />
          </div>
        </GreenBackground>
        <ToastContainer /> {/* Contenedor de las notificaciones */}
      </ContenedorLoginRegister >
    </>
  );
};

export default LoginComponent; // Exporta el componente para su uso en otras partes de la aplicación
