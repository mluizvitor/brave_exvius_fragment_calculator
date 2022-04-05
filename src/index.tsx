import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import * as ReactDomClient from 'react-dom/client';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import App from './App';
import { UnitProvider } from './hooks/useUnit';
import reportWebVitals from './reportWebVitals';
import { theme } from './styles/theme';


const container = document.getElementById('root');

const root = ReactDomClient.createRoot(container as HTMLElement);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <UnitProvider>
        <App />

        <ToastContainer
          theme='light'
          autoClose={3000}
          toastClassName='toastifyBody'
          closeButton={false}
          hideProgressBar
          position='top-center'
        />
      </UnitProvider>
    </ThemeProvider>
  </React.StrictMode>
);

reportWebVitals();
