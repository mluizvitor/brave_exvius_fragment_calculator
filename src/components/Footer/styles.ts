import styled from 'styled-components';

export const Footer = styled.footer`
  background: #eeeeee;
  color: #444444;
  max-width: 44rem;
  padding: 2rem 3.5rem 2rem 1.5rem;
  /* text-align: center; */
  
  display: grid;
  gap: 1rem;
  
  border-radius: 16px;

  position: fixed;
  top: 0;
  right: 0;

  margin: 2rem;

  z-index: 20;

  opacity: 0;
  transform: translateX(100%) scale(0.5);

  transition-duration: 0.5s;
  transition-property: transform opacity;
`;