import { useState } from "react";
import {
  BrowserRouter,
  Outlet,
  Route,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import Home from "./pages/Home";
import ScratchPad from "./pages/ScratchPad";
import Navigation from "./components/Navigation";
import Layout from "./components/Layout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/scratchpad", element: <ScratchPad /> },
        // add your custom pages here:
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
