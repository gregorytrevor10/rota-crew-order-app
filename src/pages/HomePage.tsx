import { routes } from "../router/router";

export const HomePage = () => {
  return (
    <div>
      {routes.map((route) => {
        return (
          <a href={route.routeObject.path}>
            <button className="bg-blue-500 text-white mx-2 px-3 py-[100px] min-w-[150px] rounded-md font-semibold">{route.title}</button>
          </a>
        );
      })}
    </div>
  );
};

export default HomePage;
