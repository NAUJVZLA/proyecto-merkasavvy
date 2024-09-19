// app/components/LoginStyles.tsx
import styled, { keyframes } from 'styled-components';

// Definir las animaciones con keyframes
const fadeIn = keyframes`
from {
    opacity: 0;
}
to {
    opacity: 1;
}
`;

const scaleUp = keyframes`
from {
    transform: scale(0.5);
}
to {
    transform: scale(1);
}
`;

const rotate = keyframes`
from {
    transform: rotate(0deg);
}
to {
    transform: rotate(360deg);
}
`;

// pendiente de pasar las animaciones a estylecomponents


// Estilos existentes
export const ContenedorLoginRegister = styled.div`
display: flex;
height: 100vh;
position: relative;
justify-content: center;
align-items: center;

`;

export const LoginForm = styled.div`
width: 400px;
padding: 2rem;
background: white;
border-radius: 8px;
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const GreenBackground = styled.div`
position: absolute;
right: 0;
top: 0;
width: 30%;
height: 100%;
background-color: #4caf50;
display: flex;
justify-content: center;
align-items: center;
`;

export const Tituloh1 = styled.h1`
font-size: 1.5rem;
font-weight: bold;
color: #4f46e5;
margin-bottom: 0.5rem;
`;

export const WelcomeBack = styled.p`
color: #6b7280;
margin-bottom: 1.5rem;
`;

export const SignUpH2 = styled.h2`
font-size: 2.25rem;
font-weight: bold;
margin-bottom: 2rem;
`;

export const InputGroup = styled.div`
margin-bottom: 1.5rem;
`;

export const InputsLabels = styled.label`
display: block;
margin-bottom: 0.5rem;
color: #374151;
`;

export const InputWithIcon = styled.div`
position: relative;
`;

export const Inputs = styled.input`
width: 100%;
padding: 0.5rem 2.5rem 0.5rem 0.75rem;
border: 1px solid #d1d5db;
border-radius: 0.375rem;
`;

export const Icon = styled.span`
position: absolute;
right: 0.75rem;
top: 50%;
transform: translateY(-50%);
color: #9ca3af;
`;

export const ForgotPassword = styled.a`
display: block;
text-align: right;
font-size: 0.875rem;
color: #4caf50;
margin-top: 0.25rem;
`;

export const SignInButton = styled.button`
width: 100%;
background-color: #4f46e5;
color: white;
padding: 0.5rem;
border: none;
border-radius: 0.375rem;
cursor: pointer;
transition: background-color 0.3s;

&:hover {
    background-color: #4338ca;
    animation: none;
    transform: scale(1.1);
    transition: transform 0.3s ease; // Animación en hover
}
`;

export const SignInLink = styled.div`
text-align: center;
margin-top: 2rem;
font-size: 0.875rem;
color: #6b7280;
a {
    color: #4caf50;
    text-decoration: none;
}
`;

