import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

const CLIENT_ID = '802852666161-o82mhq04404uckeqv9ctn8ub5fc12vug.apps.googleusercontent.com'  
//Sau nay deploy thi chuyen cai nay vao file .env, khong ne de nhu the nay

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StrictMode>
      <GoogleOAuthProvider clientId={CLIENT_ID}>
        <App />
      </GoogleOAuthProvider>
    </StrictMode>

  </BrowserRouter>
)
