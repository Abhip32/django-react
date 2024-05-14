import React from 'react'
import NavBarComponent from './components/NavBarComponent.tsx'
import "./App.css"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/FooterComponent.tsx'
import Login from './pages/Login.tsx';
import Home from './pages/Home.tsx';
import Register from './pages/Register.tsx';
import Landing from './pages/Landing.tsx';

const App = () => {
  return (
    <Router>      
      <NavBarComponent/>
        <Routes>
          <Route path="/" Component={Landing}/>
          <Route path="/login" Component={Login}/>
          <Route path="/home" Component={Home}/>
          <Route path="/register" Component={Register}/>
        </Routes>
      <Footer/>
    </Router>
  )
}

export default App