import "./App.css";

interface AppProps {
  title?: string;
}

export const App = ({ title }: AppProps) => {
  return (
    <div className="">
      <header className="App-header">
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
      </header>
    </div>
  );
};

export default App;
