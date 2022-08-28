import React from 'react'
import './App.css';
import { Routes,Route,Link } from 'react-router-dom'
import SignUp from './components/Sign up/SignUp'
import Home from './components/home/Home';
import PageNotFound from './components/PageNotFound';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/signIn' element={<SignUp/>} />
        <Route path='*' element={<PageNotFound/>} />
      </Routes>
    </>
  )
}

export default App
