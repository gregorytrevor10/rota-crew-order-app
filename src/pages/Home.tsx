import { routes } from "../router/router";
import "../styles/App.css";

interface AppProps {
  title?: string;
}

export const Home = ({ title }: AppProps) => {
  return (
    <div className="App-header">
      <h1 className="bg-slate-600 rounded-md flex">{title}</h1>
      <img src={"/logo.svg"} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
      <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
        Learn React
      </a>
      <a style={{}} href="https://www.google.com" className="bg-black text-white">
        go to google
      </a>
      <hr />
      <div>
        {routes.map((route) => {
          return (
            <a href={route.routeObject.path}>
              <button className="bg-blue-500 text-white mx-2 px-3 py-[100px] min-w-[150px] rounded-md font-semibold">{route.title}</button>
            </a>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
