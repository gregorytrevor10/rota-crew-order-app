import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../App";
import { ErrorBoundaryPage } from "../pages/ErrorBoundaryPage";

export interface CustomRouteObject {
  title: string;
  routeObject: RouteObject;
  category?: string;
}

export enum ROUTER_PATHS {
  HOME = "/",
}

export const routes: CustomRouteObject[] = [
  {
    title: ROUTER_PATHS.HOME,
    routeObject: {
      path: "/",
      element: <App />,
      errorElement: <ErrorBoundaryPage />,
    },
  },
];

export const browserRouter = createBrowserRouter(routes.map((route) => route.routeObject));
