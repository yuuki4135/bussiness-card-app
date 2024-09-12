import * as React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Card } from './components/pages/Card'
import './App.css'

const App = () => {
  return (
    <>
      <h1>Business Card App</h1>
      <nav>
        <ul>
          <li>
            <Link to='/card/sample_id'>Card</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path='/card/:id' element={<Card />} />
      </Routes>
    </>
  )
}

export default App
