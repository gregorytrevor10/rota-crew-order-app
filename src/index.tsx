import ReactDOM from "react-dom/client";
import "./styles/global.css";
import "./styles/tailwind.css";

import { RouterProvider } from "react-router-dom";
import { browserRouter } from "./router/router";
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(<RouterProvider router={browserRouter} />);
