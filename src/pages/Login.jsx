import React, { useState, useEffect } from 'react'
import NavbarLogin from '../page-components/NavbarLogin'
import FooterAlt from '../page-components/FooterAlt'
import { useNavigate, Link } from "react-router-dom"
import '../css/Form.css'

let id
const md5 = require('md5')

const Login = () => {

  useEffect(() => {
    id = localStorage.getItem('id') || "notlogged"
    if (id !== "notlogged") {
      navigate("/")
    }
  }, [])

  let navigate = useNavigate()
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(" ");

  async function compareApiData() {
    try {
      const res = await fetch('https://color-rest-api.herokuapp.com/api/color/', {
        method: 'GET'
      })
      const data = await res.json()
      for (var i = 0; i < data.length; i++) {
        if (data[i].name === name) {
          if (data[i].password === md5(password)) {
            setIsError('Logging in...');
            localStorage.setItem('id', data[i]._id);
            setTimeout(function () {
              navigate("/")
            }, 1000);
            return;
          } else {
            setIsError('Wrong password');
            return;
          }
        }
      }
      setIsError('Wrong username');
    } catch(err) {
      console.error(err)
    }
  }
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsError('Wait...')
    compareApiData();
  }

  return (
    <div className='login'>
      <NavbarLogin />
      <div className='login-cont'>
        <h1>Login page</h1>
        <form onSubmit={handleSubmit}>
          <div className='login-cont-field'>
            <label className='text-focus-in'>Username</label>
            <input 
              type="text"
              required
              value={name}
              minLength={3}
              maxLength={16}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className='login-cont-field'>
            <label className='text-focus-in'>Password</label>
            <input 
              type="password"
              required
              value={password}
              minLength={8}
              maxLength={24}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className='login-cont-message'>
            <p>{isError}</p>
          </div>
          <input 
            className='tracking-in-expand-fwd-bottom'
            type="submit"
            value="Login"
          />
          <div className='login-cont-link'>
            <p>Don't have account? <Link to="/register">Register</Link></p>
          </div>
        </form>
      </div>
      <FooterAlt />
    </div>
  )
}

export default Login