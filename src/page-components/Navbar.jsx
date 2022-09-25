import React, { useState } from 'react'
import '../css/Navbar.css'
import logo from '../images/logo.png'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri'
import { Link, useNavigate } from "react-router-dom"

const Menu = () => {
  return (
    <>
      <p><Link to="/">Home</Link></p>
      <p><Link to="/leaderboard">Leaderboard</Link></p>
      <p><Link to="/market">Market</Link></p>
    </>
  )
}

const Navbar = () => {

  let navigate = useNavigate()
  const [toggleMenu, setToggleMenu] = useState(false)

  const logout = () => {
    localStorage.setItem('id', "notlogged")
    navigate("/login")
  }

  return (
    <div className='navbar'>
      <div className='navbar-links'>
        <div className='navbar-links-logo'>
          <Link to="/"><img src={logo} alt="logo" /></Link>
        </div>
        <div className='navbar-links-cont'>
          <Menu />
        </div>
      </div>
      <div className='navbar-logout'>
        <button type='button'onClick={logout}>Logout</button>
      </div>
      <div className='navbar-menu'>
        {toggleMenu
        ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
        : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />
        }
        {toggleMenu && (
          <div className='navbar-menu-cont scale-up-hor-center'>
            <div className='navbar-menu-cont-links'>
              <Menu />
              <div className='navbar-menu-cont-links-logout'>
                <button type='button' onClick={logout}>Logout</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar