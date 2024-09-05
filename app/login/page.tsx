'use client'
// import React from "react";
// import { User, Lock } from "lucide-react";
// import Link from "next/link";
// import Logologin from "@/components/types/icons/logo-login";

// const LoginComponent: React.FC = () => {
//   return (
//     <div className="login-container">
//       <div className="login-form">
//         <h2 className="app-name">MerkaSavvy</h2>
//         <p className="welcome-back">Welcome back !!!</p>
//         <h1 className="sign-up">Sign in</h1>
//         <form id="animation">
//           <div className="input-group">
//             <label htmlFor="email">Email</label>
//             <div className="input-with-icon">
//               <input type="email" id="email" placeholder="test@gmail.com" />
//               <User id="user" className="icon" size={20} />
//             </div>
//           </div>
//           <div className="input-group">
//             <label htmlFor="password">Password</label>
//             <div className="input-with-icon">
//               <input type="password" id="password" placeholder="••••••••" />
//               <Lock id="candado" className="icon" size={20} />
//             </div>
//             <a href="#" className="forgot-password">
//               Forgot Password?
//             </a>
//           </div>
//           <button type="submit" className="sign-in-button">
//             SIGN IN →
//           </button>
//         </form>
//         <Link className="sign-in-link" href="register">
//           I have an account? Sign Up
//         </Link>
//       </div>
//       <div className="green-background">
//         <div className="vector-container">
//           <Logologin />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginComponent;


import React, { useState } from "react";
import { User, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import Logologin from "@/components/types/icons/logo-login";

const LoginComponent: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch('http://localhost:5000/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      router.push('/dashboard'); // Redirect to dashboard after successful login
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="app-name">MerkaSavvy</h2>
        <p className="welcome-back">Welcome back !!!</p>
        <h1 className="sign-up">Sign in</h1>
        <form id="animation" onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <div className="input-with-icon">
              <input
                type="email"
                id="email"
                placeholder="test@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
          I have an account? Sign Up
        </Link>
      </div>
      <div className="green-background">
        <div className="vector-container">
          <Logologin />
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;