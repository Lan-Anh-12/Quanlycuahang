import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'
import ThongKeTester from './ThongKe.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <ThongKeTester />
  </StrictMode>,
)
