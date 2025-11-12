import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import router from './Routes/Routes.jsx';
import { RouterProvider } from 'react-router';
import AuthProvider from './Auth/AuthProvider.jsx';
import Globalsearchprovider from './Pages/Globalsearchprovider.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
     <Globalsearchprovider>
        <RouterProvider router={router} />
     </Globalsearchprovider>
    </AuthProvider> 
  </StrictMode>,
)
