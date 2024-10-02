import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import LoginSignup from "../pages/LoginSignup";
import Test from "../pages/Test";
import PageNotFound from "../pages/PageNotFound";
import ProductDetails from "../pages/ProductDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
      {
        path: "test",
        element: <Test />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
  {
    path: "/auth",
    element: <LoginSignup />,
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default router;
