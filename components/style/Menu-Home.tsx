import styled from 'styled-components';

export const ContenedorMenuPrincipal = styled.div`
display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Hace el layout responsivo */
  gap: 20px; /* Espacio entre las tarjetas */
  padding: 20px; /* Espacio exterior del contenedor */

@media (max-width: 1020px) {
    grid-template-columns: repeat(2, 1fr); /* 2 columnas en pantallas medianas */
}

@media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr); /* 2 columnas en pantallas medianas */
}

@media (max-width: 480px) {
    grid-template-columns: 1fr; /* 1 columna en pantallas pequeñas */
}
`;