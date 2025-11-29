import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'
import Aos from 'aos'
import 'aos/dist/aos.css'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const CLIENT_ID = '802852666161-o82mhq04404uckeqv9ctn8ub5fc12vug.apps.googleusercontent.com'
//Sau nay deploy thi chuyen cai nay vao file .env, khong ne de nhu the nay

Aos.init({
  duration: 800,
  once: true,
})

const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <GoogleOAuthProvider clientId={CLIENT_ID}>
          <App />
        </GoogleOAuthProvider>
      </QueryClientProvider>
    </StrictMode>

  </BrowserRouter>
)
