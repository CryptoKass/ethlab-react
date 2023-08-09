import { RouterProvider } from "react-router-dom";
import { router } from "./router";

// Add new routes in `./routes.tsx`.
// Modify the layout see `./components/Layout.tsx`.

function App() {
  return <RouterProvider router={router} />;
}

export default App;
