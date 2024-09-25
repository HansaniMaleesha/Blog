import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Ensure the path is correct
import { AuthContextProvider } from './context/authContext.jsx'; // Ensure the path is correct

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <AuthContextProvider>

    
      <App />
    </AuthContextProvider>
    
     
  
  </React.StrictMode>
);
