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
              <a className="bg-blue-500 text-white mx-2 px-3 py-1 min-w-[150px] rounded-md font-semibold" href={route.routeObject.path}>
                {route.title}
              </a>
            );
          })}
        </nav>
      </header>
      {children}
      <footer>{/* Footer content */}</footer>
    </>
  );
};

export default BaseLayout;
