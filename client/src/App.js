import React, {useState} from "react";
import logo from './logo.svg';
import './App.css';
import Counter from "./components/Counter";

function App() {
  const [count, setCount] = useState(0)
  
  return (
    <div className="App">
      <header className="App-header">
        <button onClick={() => setCount(count + 1)} />
        <Counter count={count} />
      </header>
    </div>
  );
}

export default App;
