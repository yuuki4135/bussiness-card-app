import * as React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Profile } from './components/pages/profile'
import { Register } from './components/pages/register'
import { Top } from './components/pages/top'
import './App.css'
import { Container } from '@chakra-ui/react'

const App = () => {
  return (
    <>
      <Container centerContent>
        <Routes>
          <Route path='/' element={<Top />} />
          <Route path='/card/:user_id' element={<Profile />} />
          <Route path='/card/register' element={<Register />} />
        </Routes>
      </Container>
    </>
  )
}

export default App
