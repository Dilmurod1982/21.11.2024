import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import {
  About,
  Contact,
  Home,
  Login,
  Register,
  ErrorPage,
  SingleProduct,
  Cart,
  Todos,
} from "./pages";
import MainLayout from "./layouts/MainLayout";
import { action as RegisterAction } from "./pages/Register";
import { action as LoginAction } from "./pages/Login";
import { action as TodosAction } from "./pages/Todos";
import { useAppStore } from "./lib/zustand";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import { loader as HomeLoader } from "./pages/Home";
import { loader as SingleProductLoader } from "./pages/SingleProduct";

function App() {
  const user = useAppStore((state) => state.user);
  const setUser = useAppStore((state) => state.setUser);
  const isAuthReady = useAppStore((state) => state.isAuthReady);
  const setIsAuthReady = useAppStore((state) => state.setIsAuthReady);

  const routes = createBrowserRouter([
    {
      path: "/",
      errorElement: <ErrorPage />,
      element: (
        <ProtectedRoutes user={user}>
          <MainLayout />
        </ProtectedRoutes>
      ),
      children: [
        {
          index: true,
          element: <Home />,
          loader: HomeLoader,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/contact",
          element: <Contact />,
        },
        {
          path: "/singleProduct/:id",
          element: <SingleProduct />,
          loader: SingleProductLoader,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "/todos",
          element: <Todos />,
          action: TodosAction,
        },
      ],
    },
    {
      path: "/login",
      errorElement: <ErrorPage />,
      element: user ? <Navigate to="/" /> : <Login />,
      action: LoginAction,
    },
    {
      path: "/register",
      errorElement: <ErrorPage />,
      element: user ? <Navigate to="/" /> : <Register />,
      action: RegisterAction,
    },
  ]);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsAuthReady(true);
    });
  }, []);
  return <>{isAuthReady && <RouterProvider router={routes} />}</>;
}

export default App;
