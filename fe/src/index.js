import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Create } from "./components/Create";
import { Companies } from "./components/Companies";
import { DetailedView } from "./components/DetailedView";
import { CreateJobDesc } from "./components/CreateJobDesc";
import { JobDetailedView } from "./components/JobDetailedView";
import { CompaniesAppliedTo } from "./components/CompaniesAppliedTo";
import { ApplicationsReceived } from "./components/ApplicationsReceived";

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
    path: "/create-job",
    element: <CreateJobDesc />
  },
  {
    path: "/companies",
    element: <Companies />
  },
  {
    path: "/show/:id",
    element: <DetailedView />
  },
  {
    path: "/show-job/:id",
    element: <JobDetailedView />
  },
  {
    path: "/companies-applied",
    element: <CompaniesAppliedTo />
  },
  {
    path: "/applications-recv",
    element: <ApplicationsReceived />
  }
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
    {/* <App /> */}
  </React.StrictMode>
);
