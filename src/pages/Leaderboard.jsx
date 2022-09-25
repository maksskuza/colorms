import React, { useState, useEffect } from 'react'
import Navbar from '../page-components/Navbar'
import HeaderLeaderboard from '../page-components/HeaderLeaderboard'
import Footer from '../page-components/Footer'
import Table from '../page-components/Table'
import { useNavigate } from 'react-router-dom'
import '../css/Leaderboard.css'

let arrData = []
let top3RgbEasy = []
let top3RgbHard = []
let top3HexEasy = []
let top3HexHard = []
let id

const Leaderboard = () => {
  const [rgbEasy, setRgbEasy] = useState()
  const [rgbHard, setRgbHard] = useState()
  const [hexEasy, setHexEasy] = useState()
  const [hexHard, setHexHard] = useState()

  const [youRgbEasy, setYouRgbEasy] = useState('')
  const [youRgbHard, setYouRgbHard] = useState('')
  const [youHexEasy, setYouHexEasy] = useState('')
  const [youHexHard, setYouHexHard] = useState('')
  const [youName, setYouName] = useState('')
  
  let navigate = useNavigate()

  async function getApiData() {
    try {
      const res = await fetch('https://color-rest-api.herokuapp.com/api/color/', {
        method: 'GET'
      })
      const data = await res.json()
      arrData = []
      for (var i = 0; i < data.length; i++) {
        arrData.push({
          name: data[i].name,
          rgbEasy: data[i].easyRgb,
          rgbHard: data[i].hardRgb,
          hexEasy: data[i].easyHex,
          hexHard: data[i].hardHex
        })

        if (data[i]._id === id) {
          setYouRgbEasy(data[i].easyRgb)
          setYouRgbHard(data[i].hardRgb)
          setYouHexEasy(data[i].easyHex)
          setYouHexHard(data[i].hardHex)
          setYouName(data[i].name)
        }
      }
    } catch(err) {
      console.error(err)
    }
    getTop3()
  } 

  useEffect(() => {
    id = localStorage.getItem('id') || "notlogged"
    if (id === "notlogged") {
      navigate("/login")
    } else {
      getApiData()
    }
  }, [])

  const getTop3 = () => {
    top3RgbEasy = arrData.sort(function (a, b) {
        return b.rgbEasy - a.rgbEasy
    }).slice(0, 10)

    let a = top3RgbEasy.map((rgbe, index) => <Table 
      key={index}
      id={index} 
      name={rgbe.name} 
      score={rgbe.rgbEasy}
    />)
    setRgbEasy(a)

    top3RgbHard = arrData.sort(function (a, b) {
        return b.rgbHard - a.rgbHard
    }).slice(0, 10)

    let b = top3RgbHard.map((rgbe, index) => <Table 
      key={index}
      id={index} 
      name={rgbe.name} 
      score={rgbe.rgbHard}
    />)
    setRgbHard(b)

    top3HexEasy = arrData.sort(function (a, b) {
        return b.hexEasy - a.hexEasy
    }).slice(0, 10)

    let c = top3HexEasy.map((rgbe, index) => <Table 
      key={index}
      id={index} 
      name={rgbe.name} 
      score={rgbe.hexEasy}
    />)
    setHexEasy(c)

    top3HexHard = arrData.sort(function (a, b) {
        return b.hexHard - a.hexHard
    }).slice(0, 10)

    let d = top3HexHard.map((rgbe, index) => <Table 
      key={index}
      id={index} 
      name={rgbe.name} 
      score={rgbe.hexHard}
    />)
    setHexHard(d)
  }

  return (
    <div className='leaderboard'>
      <Navbar />
      <HeaderLeaderboard />
      <div className='leaderboard-welcome'>
        <h1>Welcome {youName}!</h1>
        <p>Below are your highscores:</p>
      </div>
      <div className='leaderboard-top'>
        <div className='leaderboard-top-cont'>
          <h2>RGB()_EASY</h2>
          <h3>Your highscore: {youRgbEasy}</h3>
        </div>
        <div className='leaderboard-top-cont'>
          <h2>#HEX_EASY</h2>
          <h3>Your highscore: {youHexEasy}</h3>
        </div>
        <div className='leaderboard-top-cont'>
          <h2>RGB()_HARD</h2>
          <h3>Your highscore: {youRgbHard}</h3>
        </div>
        <div className='leaderboard-top-cont'>
          <h2>#HEX_HARD</h2>
          <h3>Your highscore: {youHexHard}</h3>
        </div>
      </div>
      <div className='leaderboard-table'>
        <div className='leaderboard-table-cont'>
          <table>
            <thead>
              <tr>
                <th colSpan={3}>RGB()_EASY</th>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>Pos.</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            {rgbEasy}
          </table>
        </div>
        <div className='leaderboard-table-cont'>
          <table>
            <thead>
              <tr>
                <th colSpan={3}>#HEX_EASY</th>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>Pos.</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            {hexEasy}
          </table>
        </div>
        <div className='leaderboard-table-cont'>
          <table>
            <thead>
              <tr>
                <th colSpan={3}>RGB()_HARD</th>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>Pos.</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            {rgbHard}
          </table>
        </div>
        <div className='leaderboard-table-cont'>
          <table>
            <thead>
              <tr>
                <th colSpan={3}>#HEX_HARD</th>
              </tr>
            </thead>
            <thead>
              <tr>
                <th>Pos.</th>
                <th>Name</th>
                <th>Score</th>
              </tr>
            </thead>
            {hexHard}
          </table>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Leaderboard