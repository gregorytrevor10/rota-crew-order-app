import { useLocation } from "react-router-dom";
import { ROUTER_PATHS, routes } from "../router/router";
import { useEffect, useState } from "react";

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  const location = useLocation();
  const [shouldDisplayNav, setShouldDisplayNav] = useState<boolean>(true);

  const getRouteTitle = (): string | null => {
    const currentRoute = routes.find((route) => route.routeObject.path === location.pathname);
    return currentRoute ? currentRoute.title : null;
  };

  useEffect(() => {
    switch (location.pathname) {
      case ROUTER_PATHS.HOME:
        setShouldDisplayNav(false);
        break;
    }
  }, [location]);

  return (
    <>
      <header>
        <h1 className="text-2xl font-semibold text-center">{getRouteTitle()}</h1>
        {shouldDisplayNav ? (
          <nav className="flex overflow-x-auto whitespace-nowrap no-scrollbar p-4">
            {routes.map((route) => {
              return (
                <a className="bg-blue-500 text-white mx-2 px-3 py-1 min-w-[150px] rounded-md font-semibold" href={route.routeObject.path}>
                  {route.title}
                </a>
              );
            })}
          </nav>
        ) : null}
      </header>
      {children}
      <footer>{/* Footer content */}</footer>
    </>
  );
};

export default BaseLayout;
