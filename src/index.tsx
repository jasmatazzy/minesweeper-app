import React from "react";
import {createRoot} from "react-dom/client";
import './index.css';
import 'core-js/';
import Main from "./components/Main";


const container = document.getElementById("app-root")!;
const root = createRoot(container);

const App: React.FC = () => {
  return <div>
    <div>Hello World!</div>
    <div>
     {<Main />}
    </div>
  </div>;
};

root.render(<App />);
