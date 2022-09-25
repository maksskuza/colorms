import React, { useState, useEffect } from 'react'
import NavbarRegister from '../page-components/NavbarRegister'
import FooterAlt from '../page-components/FooterAlt'
import { useNavigate, Link } from "react-router-dom"
import '../css/Form.css'

let id
const md5 = require('md5')

const Register = () => {

  useEffect(() => {
    id = localStorage.getItem('id') || "notlogged";
    if (id !== "notlogged") {
      navigate("/")
    }
  }, [])

  let navigate = useNavigate();
  const [name, setName] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [isError, setIsError] = useState(" ");

  async function addUserToApi() {
    let body = { 
      "name": name,
      "password": md5(password1)
    }

    try {
      await fetch('https://color-rest-api.herokuapp.com/api/color/', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })
    } catch(err) {
      console.error(err)
    }
  }

  async function compareApiData() {
    try {
      const res = await fetch('https://color-rest-api.herokuapp.com/api/color/', {
        method: 'GET'
      })
      const data = await res.json()
      for (var i = 0; i < data.length; i++) {
        if (data[i].name === name) {
          setIsError('This name is already taken');
          return;
        }
      }
      addUserToApi();
      setIsError('Creating account...');
      setTimeout(function () {
        navigate("/login")
      }, 1000);
    } catch(err) {
      console.error(err)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    var hash1 = md5(password1)
    var hash2 = md5(password2)
    
    if (hash1 === hash2) {
      setIsError('Wait...')
      compareApiData();
    } else {
      setIsError('Repeat password correctly');
    }
  }

  return (
    <div className='register'>
      <NavbarRegister />
      <div className='login-cont'>
        <h1>Register page</h1>
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
              value={password1}
              minLength={8}
              maxLength={24}
              onChange={(e) => setPassword1(e.target.value)}
            />
          </div>
          <div className='login-cont-field'>
            <label className='text-focus-in'>Confirm password</label>
            <input 
              type="password"
              required
              value={password2}
              minLength={8}
              maxLength={24} 
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>
          <div className='login-cont-message'>
            <p>{isError}</p>
          </div>
          <input 
            className='tracking-in-expand-fwd-bottom'
            type="submit"
            value="Register"
          />
          <div className='login-cont-link'>
            <p>Already have account? <Link to="/login">Login</Link></p>
          </div>
        </form>
      </div>
      <FooterAlt />
    </div>
  )
}

export default Register