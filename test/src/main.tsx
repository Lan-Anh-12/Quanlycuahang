import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'
import ThongKeTester from './ThongKe.tsx'
import LoginTest from './logintest.tsx'
import QuanLyTest from './phanquyentest.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <ThongKeTester />
    <LoginTest></LoginTest>
    <QuanLyTest></QuanLyTest>
  </StrictMode>,
)
