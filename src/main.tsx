// Arquivo principal de entrada da aplicação
// Configura React, roteamento e renderiza o componente App

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

// Renderiza a aplicação no elemento com id 'root'
// StrictMode ajuda a detectar problemas em desenvolvimento
// BrowserRouter permite navegação entre páginas
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)