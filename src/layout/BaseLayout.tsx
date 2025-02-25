import { useLocation } from "react-router-dom";
import { ROUTER_PATHS, routes } from "../router/router";
import { useEffect, useState } from "react";
import "../styles/layout/BaseLayout.css";

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
    <div className="layout-container">
      <header className="bg-slate-500 text-white shadow-md py-[2rem] px-[1.5rem] text-left">
        <h1 className="text-2xl font-semibold">{getRouteTitle()}</h1>
      </header>
      <main className="content">{children}</main>
      <footer>
        {shouldDisplayNav ? (
          <nav className="flex overflow-x-auto whitespace-nowrap no-scrollbar p-4">
            {routes.map((route) => {
              return (
                <a className="bg-blue-500 text-white mx-2 py-[1.25rem] text-center min-w-[175px] rounded-md font-semibold" href={route.routeObject.path}>
                  {route.title}
                </a>
              );
            })}
          </nav>
        ) : null}
      </footer>
    </div>
  );
};

export default BaseLayout;
