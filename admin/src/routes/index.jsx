import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Products from '../pages/Products'
import Categories from '../pages/Categories'
import Users from '../pages/Users'
import Orders from '../pages/Orders'
import Home from '../pages/Home'
import Login from "../pages/Login";

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
        path: "/dashboard",
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "orders",
        element: <Orders />,
      },
      {

      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
