import { createGlobalStyle } from 'styled-components';
import background from '../assets/background.webp';

export default createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }


  body::before {
    content: "";
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    background-image: ${`url(${background})`};
    background-size: cover;
    background-repeat: no-repeat;
    
    filter: brightness(0.6);
    z-index: -1;
  }

  main { 
    width: auto;
    margin: 0 auto;
    padding: 3rem 6rem;

    @media (max-width: 1366px) {
      padding: 3rem 1rem;
    }
  }

  small {
    font-size: 0.75rem;
  }

  .toastifyBody {
    border-radius: 8px;
    font-family: Inter, sans-serif;
    line-height: 1.25rem;
    padding: 0.5rem 1rem;

    color: #BBBBBB;
    background: #1b1f2b;
  }

  .banner-show {
    opacity: 1;
    transform: translateX(0) scale(1);
  }

`;