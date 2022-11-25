import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Create } from './components/Create'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />
  },
  {
    path: "/create",
    element: <Create />
  },
  {
    path: "/show",
    element: <Create />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <RouterProvider router={router} /> */}
    <App />
  </React.StrictMode>
)
