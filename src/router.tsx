import { createBrowserRouter } from "react-router-dom";
import { routes } from "./ethlab/routes";
import Layout from "./components/Layout";
import HomePage from "./pages/Home";
import NotFoundPage from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // loads EthLab development routes:
      // '/contracts', '/transactions', '/scratchpad' etc.
      ...routes.dev,
      // → add your custom pages here:
      { path: "/", element: <HomePage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
