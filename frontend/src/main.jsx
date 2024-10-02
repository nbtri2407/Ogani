import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import router from "./router/index.jsx";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
