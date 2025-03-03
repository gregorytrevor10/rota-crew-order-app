import RotaIcon from "../components/RotaIcon";
import { routes } from "../router/router";
import { isMobileDevice, sexyTailwindButtonClassnameNoShadow } from "../utils";

export const HomePage = () => {
  return (
    <div className="pt-[5em]">
      <RotaIcon />
      <div className={`flex ${!isMobileDevice() ? "flex-col" : "flex-row"} justify-center mt-[4em] gap-y-5 mx-[10vw]`}>
        {routes.map((route) => {
          return (
            <a href={route.routeObject.path} className={`${sexyTailwindButtonClassnameNoShadow} mt- shadow-none border-none active:scale-90 mx-auto`}>
              <button className={`min-w-[175px] bg-blue-500 text-white mx-2 px-3 py-[50px] rounded-full font-semibold`}>
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
