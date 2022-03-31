import { createGlobalStyle } from 'styled-components';
import background from '../assets/background.webp';

export default createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html { 
    @media (max-width: 720px) {
      font-size: 87.5%;
    }
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
    padding: 4rem 8rem;

    @media (max-width: 720px) {
      padding: 3rem 2rem;
    }
  }

  body, button { 
    font-family: Inter, sans-serif;
    line-height: 1.25rem;
  }

  strong {
    font-weight: 600;
  }

  input, select {
    font-size: 1rem;
    padding: 0 0.5rem;
  }

  h1 {
    color: #ffffff;
  }

  input[type="checkbox"] {
    -webkit-appearance: none;
    appearance: none;
    background-color: transparent;
    margin: 0;
    cursor: pointer;
    font: inherit;
    width: 1.5rem;
    height: 1.5rem;
    border: 2px solid #00000066;
    border-radius: 4px;
    display: grid;
    place-content: center;

    margin-right: 0.5rem;

    &:disabled {
      pointer-events: none;
    }

    &::before {
      content: "";
      width: 1.5rem;
      height: 1.5rem;
      transform: scale(1);
      background-color: transparent;
      transform-origin: center;
      clip-path: polygon(25.000% 41.667%, 16.667% 50.000%, 41.667% 75.000%, 83.333% 33.333%, 75.000% 25.000%, 41.667% 58.333%)
    }

    &:checked {
      background-color: #1c377c;
      border: 2px solid #1c377c;
    }
    &:checked::before {
      background-color: #ffffff;
      transform: scale(1);
    }

    &:focus {
      border-color: #1c377c;
      outline-offset: 0;
      outline-color: #1c377c33;
      outline-width: 4px;
      outline-style: solid;
    }

    &.inputSuccess {
      &:checked {
        background-color: #1cA96c;
        border: 2px solid #1cA96c;
      }
    }
  }

  .toastifyBody {
    border-radius: 8px;
    font-family: Inter, sans-serif;
    line-height: 1.25rem;
    padding: 0.5rem 1rem;
  }

`;