import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import Layout from "./components/Layout";
import { routes } from "./internal/routes";
import NotFoundPage from "./pages/NotFound";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        // ethlab development routes
        // /contracts, /transactions, /scratchpad, etc.
        ...routes.dev,

        { path: "/", element: <HomePage /> },
        { path: "*", element: <NotFoundPage /> },
        // add your custom pages here:
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
