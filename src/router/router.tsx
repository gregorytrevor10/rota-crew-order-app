import { createBrowserRouter, RouteObject } from "react-router-dom";
import { ErrorBoundaryPage } from "../pages/ErrorBoundaryPage";
import BaseLayout from "../layout/BaseLayout";
import HomePage from "../pages/HomePage";
import LunchPage from "../pages/FoodOrderPage";
import MemberManagementPage from "../pages/MemberManagementPage";

export interface CustomRouteObject {
  title: string;
  routeObject: RouteObject;
  category?: string;
}

export enum ROUTER_PATHS {
  HOME = "/",
  MEAL_ROSTER = "/meal-roster",
  DINNER = "/dinner",
  ADD_MEMBER = "/add_member",
}

export const routes: CustomRouteObject[] = [
  {
    title: "🏠 Home",
    routeObject: {
      path: ROUTER_PATHS.HOME,
      element: <BaseLayout children={<HomePage />} />,
      errorElement: <ErrorBoundaryPage />,
    },
  },
  {
    title: "🍖 Food Orders",
    routeObject: {
      path: ROUTER_PATHS.MEAL_ROSTER,
      element: <BaseLayout children={<LunchPage />} />,
      errorElement: <ErrorBoundaryPage />,
    },
  },
  {
    title: "🧑🏻‍🚒 Member Managements",
    routeObject: {
      path: ROUTER_PATHS.ADD_MEMBER,
      element: <BaseLayout children={<MemberManagementPage />} />,
      errorElement: <ErrorBoundaryPage />,
    },
  },
];

export const browserRouter = createBrowserRouter(routes.map((route) => route.routeObject));
