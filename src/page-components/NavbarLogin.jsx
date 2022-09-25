import React from 'react'
import '../css/Navbar.css'
import logo from '../images/logo.png'
import { useNavigate, Link } from "react-router-dom"

const NavbarLogin = () => {
  let navigate = useNavigate()

  return (
    <div className='navbar'>
      <div className='navbar-links'>
        <div className='navbar-links-logo'>
          <Link to="/"><img src={logo} alt="logo" /></Link>
        </div>
      </div>
      <div className='navbar-logout'>
        <button type='button' onClick={() => navigate('/register')}>Register page</button>
      </div>
    </div>
  )
}

export default NavbarLogin