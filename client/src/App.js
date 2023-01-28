import React, {useState} from "react";
import logo from './logo.svg';
import './App.css';
import Counter from "./components/Counter";
import TemporaryDrawer from "./UI/Sidebar";

import teamPage from "./UI/Teampage";

function App() {
  const [count, setCount] = useState(0)
  
  return (
    <div className="App">
      <header className="App-header">
        <button className="bg-slate-600 px-4 py-2 rounded-[15px]" onClick={() => setCount(count + 1)}>ADD</button>
        <Counter count={count} />
        <TemporaryDrawer />
      </header>
    </div>
  );
}

export default App;
