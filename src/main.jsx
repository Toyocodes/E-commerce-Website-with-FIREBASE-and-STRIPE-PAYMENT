import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
//import cart provider
import CartProvider from './context/CartContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <CartProvider>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </CartProvider> 
 
);
