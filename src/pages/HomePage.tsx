import RotaIcon from "../components/RotaIcon";
import { routes } from "../router/router";
import { sexyTailwindButtonClassnameNoShadow } from "../utils";

export const HomePage = () => {
  return (
    <div className="pt-[5em]">
      <RotaIcon />
      <div className="flex flex-row justify-center mt-4 gap-y-5 mx-[10vw]">
        {routes.map((route) => {
          return (
            <a href={route.routeObject.path} className={`${sexyTailwindButtonClassnameNoShadow} shadow-none border-none active:scale-90`}>
              <button className="min-w-[150px] bg-blue-500 text-white mx-2 px-3 py-[50px] rounded-md font-semibold">
                <span className="text-4xl">{route.title.split(" ")[0]}</span>
                <br />
                <span className="text-2xl">{route.title.split(" ")[1]}</span>
              </button>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
