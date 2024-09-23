import * as React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Profile } from './components/pages/profile'
import { Register } from './components/pages/register'
import './App.css'

const App = () => {
  return (
    <>
      <nav>
        <Link to='/card/sample_id'>Card</Link>
        <Link to='/card/register'>登録</Link>
      </nav>

      <Routes>
        <Route path='/card/:user_id' element={<Profile />} />
        <Route path='/card/register' element={<Register />} />
      </Routes>
    </>
  )
}

export default App
