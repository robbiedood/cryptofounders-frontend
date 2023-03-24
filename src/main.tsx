import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './i18n';
import './index.css'
import ThemeProvider from './ThemeContext';
import { OfferProvider } from './ModalContext';
import { Buffer } from "buffer";
window.Buffer = Buffer; // a simple solution to make Buffer available in the browser (ref: https://stackoverflow.com/questions/70714690/buffer-is-not-defined-in-react-vite)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <OfferProvider>
        <App />
      </OfferProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
