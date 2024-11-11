import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import LoginSignup from "../pages/LoginSignup";
import Test from "../pages/Test";
import PageNotFound from "../pages/PageNotFound";
import ProductDetails from "../pages/ProductDetails";
import Checkout from "../pages/Checkout";
import Profile from "../pages/Profile";
import OrderSuccess from "../pages/OrderSuccess";
import WishList from "../pages/WishList";
import CategoryPreviews from "../pages/CategoryPreviews";

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
        path: "/category/:id",
        element: <CategoryPreviews />,
      },
      {
        path: "test",
        element: <Test />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "order-success",
        element: <OrderSuccess />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "/auth",
        element: <LoginSignup />,
      },
      {
        path: "/wishlist",
        element: <WishList />,
      },
      // WishList
    ],
  },

  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default router;
