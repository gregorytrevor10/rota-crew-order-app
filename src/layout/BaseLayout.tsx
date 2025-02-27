import { routes } from "../router/router";

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <>
      <header>
        <nav className="flex overflow-x-auto whitespace-nowrap no-scrollbar p-4 bg-marian_blue">
          {routes.map((route) => {
            return (
              <a className="bg-azure text-white mx-2 p-2 rounded hover:bg-light_cyan transition-colors" href={route.routeObject.path} key={route.routeObject.path}>
                {route.title}
              </a>
            );
          })}
        </nav>
      </header>
      <div className="min-h-screen bg-oxford_blue text-light_cyan">{children}</div>
      <footer className="bg-marian_blue text-light_cyan p-4 text-center">{/* Footer content */}</footer>
    </>
  );
};

export default BaseLayout;
