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
  LUNCH = "/lunch",
  DINNER = "/dinner",
  ADD_MEMBER = "/add_member",
}

export const routes: CustomRouteObject[] = [
  {
    title: "Home",
    routeObject: {
      path: ROUTER_PATHS.HOME,
      element: <App />,
      errorElement: <ErrorBoundaryPage />,
    },
  },
  {
    title: "Lunch",
    routeObject: {
      path: ROUTER_PATHS.LUNCH,
      element: <App />,
      errorElement: <ErrorBoundaryPage />,
    },
  },
  {
    title: "Dinner",
    routeObject: {
      path: ROUTER_PATHS.DINNER,
      element: <App />,
      errorElement: <ErrorBoundaryPage />,
    },
  },
  {
    title: "Adding of Members",
    routeObject: {
      path: ROUTER_PATHS.ADD_MEMBER,
      element: <App />,
      errorElement: <ErrorBoundaryPage />,
    },
  },
];

export const browserRouter = createBrowserRouter(routes.map((route) => route.routeObject));
