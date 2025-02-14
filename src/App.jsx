import React from 'react'
import Navbar from './components/Navbar'
import Home from './components/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContactPage from './components/ContactPage';
import VirtualFitTool from './components/VirtualFitTool';
import Signup from './components/Signup';
import Login from './components/Login';
import ErrorPage from './components/ErrorPage';

const App = () => {
  return (
   <Router>
      <Navbar/>
      
      <Routes>
       
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/virtual" element={<VirtualFitTool/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="*" element={<ErrorPage/>} />

      </Routes>
   </Router>   
    
  )
}

export default App
