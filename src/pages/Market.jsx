import React, { useState, useEffect } from 'react'
import Navbar from '../page-components/Navbar'
import HeaderMarket from '../page-components/HeaderMarket'
import Footer from '../page-components/Footer'
import { useNavigate } from 'react-router-dom'
import '../css/Market.css'

let id

const Market = () => {
  const [name, setName] = useState('')
  const [money, setMoney] = useState('')
  const [theme, setTheme] = useState()
  const [market1, setMarket1] = useState(false)
  const [market2, setMarket2] = useState(false)
  const [market3, setMarket3] = useState(false)
  const [market1Css, setMarket1Css] = useState()
  const [market2Css, setMarket2Css] = useState()
  const [market3Css, setMarket3Css] = useState()
  const [button0, setButton0] = useState()
  const [button1, setButton1] = useState()
  const [button2, setButton2] = useState()
  const [button3, setButton3] = useState()
  const [getData, setGetData] = useState(true)
  
  let navigate = useNavigate()

  async function getApiData() {
    try {
      const res = await fetch('https://color-rest-api.herokuapp.com/api/color/' + id, {
        method: 'GET'
      })
      const data = await res.json()
      setName(data.name)
      setMoney(data.money)
      setTheme(data.theme)
      setMarket1(data.market1)
      setMarket2(data.market2)
      setMarket3(data.market3)
    } catch(err) {
      console.error(err)
    }
  } 

  async function updateApi(body) {
    try {
      await fetch('https://color-rest-api.herokuapp.com/api/color/' + id, {
        method: 'PATCH',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      })
    } catch(err) {
      console.error(err)
    }
    setGetData(getData ? false : true)
  }

  useEffect(() => {
    id = localStorage.getItem('id') || "notlogged"
    if (id === "notlogged") {
      navigate("/login")
    } else {
      getApiData()
    }
  }, [getData])

  const get0Button = () => {
    if (theme === 0) {
      let bt = <button disabled>IN USE</button>
      setButton0(bt)
    } else {
      let bt = <button onClick={but0Click}>USE</button>
      setButton0(bt)
    }
  }

  const but0Click = () => {
    let body = {
      "theme": 0
    }
    updateApi(body)
  }

  const get1Button = () => {
    if (!market1) {
      if (money >= 100) {
        let bt = <button onClick={but1Click}>BUY FOR 100</button>
        setButton1(bt)
        setMarket1Css({backgroundColor: 'rgba(0,0,0,0.5)'})
      } else {
        let bt = <button disabled>BUY FOR 100</button>
        setButton1(bt)
        setMarket1Css({backgroundColor: 'rgba(0,0,0,0.5)'})
      }
    } else {
      if (theme === 1) {
        let bt = <button disabled>IN USE</button>
        setButton1(bt)
        setMarket1Css({backgroundColor: 'inherit'})
      } else {
        let bt = <button onClick={but1Click}>USE</button>
        setButton1(bt)
        setMarket1Css({backgroundColor: 'inherit'})
      }
    }
  }

  const but1Click = () => {
    if (!market1) {
      let newMoney = money - 100
      let body = {
        "money": newMoney,
        "market1": true,
        "theme": 1
      }
      updateApi(body)
    } else {
      let body = {
        "theme": 1
      }
      updateApi(body)
    }
  }

  const get2Button = () => {
    if (!market2) {
      if (money >= 250) {
        let bt = <button onClick={but2Click}>BUY FOR 250</button>
        setButton2(bt)
        setMarket2Css({backgroundColor: 'rgba(0,0,0,0.5)'})
      } else {
        let bt = <button disabled>BUY FOR 250</button>
        setButton2(bt)
        setMarket2Css({backgroundColor: 'rgba(0,0,0,0.5)'})
      }
    } else {
      if (theme === 2) {
        let bt = <button disabled>IN USE</button>
        setButton2(bt)
        setMarket2Css({backgroundColor: 'inherit'})
      } else {
        let bt = <button onClick={but2Click}>USE</button>
        setButton2(bt)
        setMarket2Css({backgroundColor: 'inherit'})
      }
    }
  }

  const but2Click = () => {
    if (!market2) {
      let newMoney = money - 250
      let body = {
        "money": newMoney,
        "market2": true,
        "theme": 2
      }
      updateApi(body)
    } else {
      let body = {
        "theme": 2
      }
      updateApi(body)
    }
  }

  const get3Button = () => {
    if (!market3) {
      if (money >= 500) {
        let bt = <button onClick={but3Click}>BUY FOR 500</button>
        setButton3(bt)
        setMarket3Css({backgroundColor: 'rgba(0,0,0,0.5)'})
      } else {
        let bt = <button disabled>BUY FOR 500</button>
        setButton3(bt)
        setMarket3Css({backgroundColor: 'rgba(0,0,0,0.5)'})
      }
    } else {
      if (theme === 3) {
        let bt = <button disabled>IN USE</button>
        setButton3(bt)
        setMarket3Css({backgroundColor: 'inherit'})
      } else {
        let bt = <button onClick={but3Click}>USE</button>
        setButton3(bt)
        setMarket3Css({backgroundColor: 'inherit'})
      }
    }
  }

  const but3Click = () => {
    if (!market3) {
      let newMoney = money - 500
      let body = {
        "money": newMoney,
        "market3": true,
        "theme": 3
      }
      updateApi(body)
    } else {
      let body = {
        "theme": 3
      }
      updateApi(body)
    }
  }

  useEffect(() => {
    get0Button()
    get1Button()
    get2Button()
    get3Button()
  }, [theme])

  return (
    <div className='market'>
      <Navbar />
      <HeaderMarket />
      <div className='market-welcome'>
        <h1>Welcome {name}!</h1>
        <p>Your money: {money}</p>
      </div>
      <div className='market-images'>
        <div className='market-images-cont'>
          <div className='img0'>
            <div className='in'></div>
          </div>
          {button0}
        </div>
        <div className='market-images-cont'>
          <div className='img1'>
            <div className='in' style={market1Css}></div>
          </div>
          {button1}
        </div>
        <div className='market-images-cont'>
          <div className='img2'>
            <div className='in' style={market2Css}></div>
          </div>
          {button2}
        </div>
        <div className='market-images-cont'>
          <div className='img3'>
            <div className='in' style={market3Css}></div>
          </div>
          {button3}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Market