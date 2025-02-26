import { routes } from "../router/router";

interface BaseLayoutProps {
  children: React.ReactNode;
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <>
      <header>
        <nav className="flex overflow-x-auto whitespace-nowrap no-scrollbar p-4 bg-[#03045E]">
          {routes.map((route) => {
            return (
              <a className="bg-[#0077B6] text-white mx-2 p-2 rounded hover:bg-[#00B4D8] transition-colors" href={route.routeObject.path} key={route.routeObject.path}>
                {route.title}
              </a>
            );
          })}
        </nav>
      </header>
      <div className="min-h-screen bg-[#CAF0F8]">{children}</div>
      <footer className="bg-[#03045E] text-white p-4 text-center">{/* Footer content */}</footer>
    </>
  );
};

export default BaseLayout;
