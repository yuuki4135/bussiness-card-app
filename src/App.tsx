import * as React from 'react'
import './App.css'

const App = () => {
  const [count, setCount] = React.useState(0)

  return (
    <>
      <h1 data-testid="title">Hello Jest</h1>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </>
  )
}

export default App
