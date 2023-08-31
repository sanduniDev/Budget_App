import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BudgetsProvider } from "./contexts/BudgetContext.tsx"




ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BudgetsProvider>
    <App />
    </BudgetsProvider>
  </React.StrictMode>,
)
