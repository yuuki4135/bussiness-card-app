import * as React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Profile } from './components/pages/profile'
import './App.css'

const App = () => {
  return (
    <>
      <nav>
        <Link to='/card/sample_id'>Card</Link>
      </nav>

      <Routes>
        <Route path='/card/:user_id' element={<Profile />} />
      </Routes>
    </>
  )
}

export default App
