import ReactDOM from "react-dom/client";
import "./styles/global.css";
import "./styles/tailwind.css";
import "primeicons/primeicons.css";

import { RouterProvider } from "react-router-dom";
import { browserRouter } from "./router/router";
import { ToastContainer } from "react-toastify";
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <div className="font-figtree">
    <RouterProvider router={browserRouter} />
    <ToastContainer />
  </div>
);
