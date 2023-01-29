import React, {useState} from 'react'
import TemporaryDrawer from "../UI/Sidebar";
import Counter from "./Counter";

export default function Home() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <div className="App">
          <header className="App-header">
            <button className="bg-slate-600 px-4 py-2 rounded-[15px]" onClick={() => setCount(count + 1)}>ADD</button>
            <Counter count={count} />
            <TemporaryDrawer />
          </header>
        </div>
    </div>
  )
}
