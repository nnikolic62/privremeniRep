import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Store from "./pages/Store";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "store", element: <Store /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
