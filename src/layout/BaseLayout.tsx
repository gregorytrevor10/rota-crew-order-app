import { routes } from "../router/router";

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <>
      <header>
        <nav className="flex overflow-x-auto whitespace-nowrap no-scrollbar p-4">
          {routes.map((route) => {
            return (
              <a className="bg-blue-500 text-white mx-2 p-1" href={route.routeObject.path}>
                {route.title}
              </a>
            );
          })}
        </nav>
      </header>
      <div>{children}</div>
      <footer>{/* Footer content */}</footer>
    </>
  );
};

export default BaseLayout;
