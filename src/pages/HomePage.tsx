import { routes } from "../router/router";
import { sexyTailwindButtonClassname } from "../utils";

export const HomePage = () => {
  return (
    <div className="pt-[5em]">
      <div className="flex flex-row items-center gap-[3em] justify-center">
        <img className="block p-3 bg-white rounded-lg mt-[5em] max-w-[15vw]" src="https://www.scdf.gov.sg/images/default-source/about-scdf/sentosa-fire-station-tmb-ze-250-250.png?sfvrsn=df1432d2_1" alt="" />
        <h1 className="text-5xl ">Rota 2</h1>
      </div>
      <div className="flex flex-col justify-center mt-4 gap-y-5 mx-[10vw]">
        {routes.map((route) => {
          return (
            <a href={route.routeObject.path} className={`${sexyTailwindButtonClassname} border-none active:scale-90`}>
              <button className="w-full bg-blue-500 text-3xl text-white mx-2 px-3 py-[100px] min-w-[150px] rounded-md font-semibold">{route.title}</button>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
