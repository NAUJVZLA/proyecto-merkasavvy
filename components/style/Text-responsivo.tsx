import styled from 'styled-components';

export const TextoResponsivo = styled.p`
  font-size: 1rem; /* Tamaño de texto por defecto para pantallas grandes */
  line-height: 1.3;   /* Espaciado entre líneas */
  margin: 10px 0;

  @media (max-width: 768px) {
    font-size: 0.9rem;  /* Reduce el tamaño de texto en pantallas medianas */
  }

  @media (max-width: 480px) {
    font-size: 0.7rem;  /* Aún más pequeño en pantallas pequeñas */
  }
`;
