import React from 'react'
import '../css/Footer.css'
import logo from '../images/logo.png'
import { Link } from "react-router-dom"

const FooterAlt = () => {
  return (
    <div className='footer'>
      <div className='footer-links'>
        <div className='footer-links-logo'>
          <img src={logo} alt="logo" />
          <p>Sample React.js Full-Stack Project</p>
        </div>
        <div className='footer-links-cont'>
          <h4>Pages</h4>
          <p><Link to="/login">Login</Link></p>
          <p><Link to="/leaderboard">Register</Link></p>
        </div>
        <div className='footer-links-cont'>
          <h4>Project</h4>
          <p>Github</p>
          <p>API</p>
        </div>
        <div className='footer-links-cont'>
          <h4>Creator</h4>
          <p>Maksymilian Skuza</p>
          <p>maksskuza@gmail.com</p>
        </div>
      </div>
      <div className='footer-ending'>
        <p>© 2022 COLOR.MS</p>
      </div>
    </div>
  )
}

export default FooterAlt