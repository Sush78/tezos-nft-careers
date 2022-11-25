import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Create } from "./components/Create";
import { Companies } from "./components/Companies";
import { DetailedView } from "./components/DetailedView";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/create",
    element: <Create />
  },
  {
    path: "/companies",
    element: <Companies />
  },
  {
    path: "/show/:id",
    element: <DetailedView />
  }
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </React.StrictMode>
);
