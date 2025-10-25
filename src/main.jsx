import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/Routes.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import CartProvider from './provider/CartProvider/CartProvider.jsx'
import { LoadingBarProvider } from './provider/LoadingBarProvider/LoadingBarProvider.jsx'
import "keen-slider/keen-slider.min.css";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <LoadingBarProvider>
        <CartProvider>
          <Toaster position='top-right' reverseOrder={false}></Toaster>
          <RouterProvider router={router}></RouterProvider>
        </CartProvider>
      </LoadingBarProvider>
    </QueryClientProvider>
  </StrictMode>,
)