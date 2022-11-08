import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Hello from './components/hello/hello'

function App() {
  const [count, setCount] = useState(0)
  type Info = {
    name: string
  }

  function hello(info: Info) {
    return `Hello ${info.name}!`
  }

  return (
    <div className="App">
      <h3>{hello({ name: "Chu Tich Nuoc" })}</h3>
      <h3><Hello name="Vuong" /></h3>
      <h3>{count}</h3>
      <button onClick={() => setCount(count + 1)}>Click</button>
    </div>
  )
}

export default App
