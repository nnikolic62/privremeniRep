import "./App.css";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import Root from "./pages/Root";
import Home from "./pages/homePage/Home";
import Store from "./pages/Store";
import Login from "./pages/loginPage/Login";
import About from "./pages/aboutPage/About";
import { Session } from "./util/Session";
import { rootLoader } from "./util/rootLoader";
import { useAppDispatch, useAppSelector } from "./hooks";
import { setUser, User } from "./store/loginSlice";
import ProtectRoute from "./util/ProtectRoute";
import Game from "./pages/gamePage/Game";
import ProtectLoginRoute from "./util/ProtectLoginRoute";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import srLatBundle from './messageBundle/messages-sr-LAT.json'
import enBundle from './messageBundle/mesages-en.json'

i18next.use(initReactI18next).init({
  lng: 'en',
  resources: {
    'sr-LAT': srLatBundle,
    'en': enBundle
  }
})


const router = createBrowserRouter([
  { path: "/", element: <Navigate to="login" replace /> },
  {
    element: <ProtectLoginRoute />,
    children: [{ path: "/login", element: <Login /> }],
  },
  {
    id: "root",
    path: "/",
    element: <Root />,
    // loader: rootLoader,
    children: [
      {
        element: <ProtectRoute />,
        children: [
          { path: "home", element: <Home /> },
          { path: "store", element: <Store /> },
          { path: "about", element: <About /> },
          { path: "game", element: <Game /> },
        ],
      },
    ],
  },
]);

function App() {
  const dipatch = useAppDispatch();
  const user: User = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    dipatch(setUser({ user: user }));
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
