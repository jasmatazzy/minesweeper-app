import React from "react";
import {createRoot} from "react-dom/client";
import './index.css';
import Main from "./pages/Main";

const container = document.getElementById("app-root")!;
const root = createRoot(container);

const App: React.FC = () => {
  return <div>
    <div>💣🧹</div>
    <div>
     {<Main />}
    </div>
  </div>;
};

root.render(<App />);
