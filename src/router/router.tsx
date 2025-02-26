import { createBrowserRouter, RouteObject } from "react-router-dom";
import Home from "../pages/Home";
import { ErrorBoundaryPage } from "../pages/ErrorBoundaryPage";
import BaseLayout from "../layout/BaseLayout";

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
    title: "🏠 Home",
    routeObject: {
      path: ROUTER_PATHS.HOME,
      element: <BaseLayout children={<Home />} />,
      errorElement: <ErrorBoundaryPage />,
    },
  },
  {
    title: "🍗 Lunch",
    routeObject: {
      path: ROUTER_PATHS.LUNCH,
      element: <BaseLayout children={<>LUNCH</>} />,
      errorElement: <ErrorBoundaryPage />,
    },
  },
  {
    title: "🍝 Dinner",
    routeObject: {
      path: ROUTER_PATHS.DINNER,
      element: <BaseLayout children={<>DINNER</>} />,
      errorElement: <ErrorBoundaryPage />,
    },
  },
  {
    title: "➕ Add Members",
    routeObject: {
      path: ROUTER_PATHS.ADD_MEMBER,
      element: <BaseLayout children={<>ADD_MEMBER</>} />,
      errorElement: <ErrorBoundaryPage />,
    },
  },
];

export const browserRouter = createBrowserRouter(routes.map((route) => route.routeObject));
