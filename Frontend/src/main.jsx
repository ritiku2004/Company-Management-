import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx'
import './index.css'
import { Toaster } from 'react-hot-toast';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <Toaster position="top-right" reverseOrder={false} />
    </BrowserRouter>
  </React.StrictMode>,
)

try {
  document.documentElement.classList.remove('dark');
  document.body.style.backgroundColor = '#ffffff';
} catch (e) {
  // server-side rendering or non-browser environment, ignore
}