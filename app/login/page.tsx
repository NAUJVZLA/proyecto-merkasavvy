import React from "react";
import { User, Lock } from "lucide-react";
import Link from "next/link";
import Logologin from "@/components/types/icons/logo-login";

const LoginComponent: React.FC = () => {
  return (
    <div className="login-container">
      <div className="login-form">
        <h2 className="app-name">MerkaSavvy</h2>
        <p className="welcome-back">Welcome back !!!</p>
        <h1 className="sign-up">Sign in</h1>
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
