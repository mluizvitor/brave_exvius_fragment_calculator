import React from 'react';
import * as ReactDomClient from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import GlobalStyles from './styles/global';


const container = document.getElementById('root');

const root = ReactDomClient.createRoot(container as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
    <GlobalStyles/>
    <ToastContainer
      theme='light'
      autoClose={3000}
      toastClassName='toastifyBody'
      closeButton={false}
      hideProgressBar
    />
  </React.StrictMode>,
);

reportWebVitals();
