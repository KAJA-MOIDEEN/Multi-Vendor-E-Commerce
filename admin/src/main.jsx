import { BrowserRouter } from "react-router-dom"
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import List from "./pages/List.jsx"
import './index.css'
import { AuthProvider } from "./context/AuthContext.jsx"

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AuthProvider>
     <App/> 
  </AuthProvider>
  </BrowserRouter>
)
