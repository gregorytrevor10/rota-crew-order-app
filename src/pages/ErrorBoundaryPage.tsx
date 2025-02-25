import { useNavigate, useRouteError } from "react-router-dom";
import { ROUTER_PATHS } from "../router/router";

interface RouteError {
  status?: number;
  statusText?: string;
  error?: string;
}

export const ErrorBoundaryPage = () => {
  const navigate = useNavigate();
  const routeError = useRouteError() as RouteError;

  const defineAppRouteError = (error: unknown) => {
    switch (error) {
      default:
        return `${routeError.error ?? "An unexpected error occurred."}`;
    }
  };

  return (
    <section className="mt-[18vh] p-4 h-full w-full font-neue">
      <div className="text-center flex flex-col space-y-4">
        <h1>{`${routeError.status ?? "Unknown"} ${routeError.statusText ?? "Error"}`}</h1>
        <code className="my-8 opacity-65">{defineAppRouteError(routeError.error)}</code>
        <button className="w-fit m-auto" onClick={() => navigate(ROUTER_PATHS.HOME)}>
          take me back home
        </button>
      </div>
    </section>
  );
};
