import React from "react";
import { User, Lock } from "lucide-react";
import Link from "next/link";
import Logoregister from "@/components/types/icons/logo-register";

const RegisterComponent: React.FC = () => {
  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="app-name">MerkaSavvy</h2>
        <p className="welcome-back">Welcome !!!</p>
        <h1 className="sign-up">Sign up</h1>
        <form id="animation">
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <div className="input-with-icon">
              <input type="email" id="email" placeholder="test@gmail.com" />
              <User id="user" className="icon" size={20} />
            </div>
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="input-with-icon">
              <input type="password" id="password" placeholder="••••••••" />
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
        <Link href="login" className="sign-in-link">
          I have an account? Sign In
        </Link>
      </div>
      <div className="green-background">
        <div className="vector-container2">
          <Logoregister />
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
