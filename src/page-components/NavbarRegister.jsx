import React from 'react'
import '../css/Navbar.css'
import logo from '../images/logo.png'
import { useNavigate, Link } from "react-router-dom"

const NavbarRegister = () => {
  let navigate = useNavigate()

  return (
    <div className='navbar'>
      <div className='navbar-links'>
        <div className='navbar-links-logo'>
          <Link to="/"><img src={logo} alt="logo" /></Link>
        </div>
      </div>
      <div className='navbar-logout'>
        <button type='button' onClick={() => navigate('/login')}>Login page</button>
      </div>
    </div>
  )
}

export default NavbarRegister