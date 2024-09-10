"use client"; // Indica que este componente se ejecuta en el cliente

import React, { useState } from "react"; // Importa React y el hook useState
import { User, Lock } from "lucide-react"; // Importa íconos de lucide-react
import Link from "next/link"; // Importa el componente Link de Next.js para la navegación
import { useRouter } from "next/navigation"; // Importa el hook useRouter para la navegación programática
import Logologin from "@/components/types/icons/logo-login"; // Importa un componente de logo
import { ToastContainer, toast } from "react-toastify"; // Importa ToastContainer y toast
import "react-toastify/dist/ReactToastify.css"; // Importa estilos de react-toastify

const LoginComponent: React.FC = () => {
  // Define el componente funcional LoginComponent
  const [email, setEmail] = useState(""); // Estado para almacenar el email
  const [password, setPassword] = useState(""); // Estado para almacenar la contraseña
  const router = useRouter(); // Inicializa el router para la navegación

  const handleSubmit = async (e: React.FormEvent) => {
    // Función para manejar el envío del formulario
    e.preventDefault(); // Previene el comportamiento por defecto del formulario

    const fetchData = async () => {
      const getData = await fetch("http://localhost:5000/usuarios"); // Espera a que se resuelva la promesa
      const data = await getData.json(); // Llama a .json() después de que se resuelva
      const user = data.find(
        (user: any) => user.email === email && user.password === password
      );

      if (user) {
        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 3000,
        }); // Notificación de éxito
        setTimeout(() => {
          router.push("/home"); // Navega al home después de la notificación
        }, 3000); // Espera 3 segundos antes de redirigir
      } else {
        toast.error("Invalid credentials, please try again", {
          position: "top-right",
          autoClose: 3000,
        }); // Notificación de error
      }

      setEmail("");
      setPassword("");
    };

    await fetchData();
  };

  return (
    // Renderiza el componente
    <div className="login-container">
      <div className="login-form">
        <h2 className="app-name">MerkaSavvy</h2>
        <p className="welcome-back">Welcome back !!!</p>
        <h1 className="sign-up">Sign in</h1>
        <form id="animation" onSubmit={handleSubmit}>
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
              <User id="user" className="icon" size={20} />
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
            <a href="#" className="forgot-password">
              Forgot Password?
            </a>
          </div>
          <button type="submit" className="sign-in-button">
            SIGN IN →
          </button>
        </form>
        <Link className="sign-in-link" href="register">
          I don't have an account? Sign Up
        </Link>
      </div>
      <div className="green-background">
        <div className="vector-container">
          <Logologin />
        </div>
      </div>
      <ToastContainer /> {/* Contenedor de las notificaciones */}
    </div>
  );
};

export default LoginComponent; // Exporta el componente para su uso en otras partes de la aplicación
