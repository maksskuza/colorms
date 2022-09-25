import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Game.css';
import ModeChanger from './ModeChanger';
import bg0 from '../images/obraz.png'
import bg1 from '../images/obraz1.png'
import bg2 from '../images/obraz2.png'
import bg3 from '../images/obraz3.png'

let id

const Game = () => {
  const [correct, setCorrect] = useState('');
  const [renderNew, setRenderNew] = useState(false);
  const [gameMessage, setGameMessage] = useState("Let's play!");
  const [gamePoints, setGamePoints] = useState(0);
  const [gameHearts, setGameHearts] = useState(3);
  const [isOver, setIsOver] = useState(false);
  const [buttonVis, setButtonVis] = useState('hidden');
  const [difficulty, setDifficulty] = useState('easy')
  const [easyStyles, setEasyStyles] = useState({backgroundColor: 'rgba(255,255,255,0.8)', color: 'black'})
  const [hardStyles, setHardStyles] = useState({backgroundColor: 'rgba(255,255,255,0.2)', color: 'white'})
  const [mode, setMode] = useState('rgb')
  const [rgbStyles, setRgbStyles] = useState({backgroundColor: 'rgba(255,255,255,0.8)', color: 'black'})
  const [hexStyles, setHexStyles] = useState({backgroundColor: 'rgba(255,255,255,0.2)', color: 'white'})
  const [displayedHearts, setDisplayedHearts] = useState('❤️❤️❤️')

  const [getData, setGetData] = useState(true)
  const [name, setName] = useState('');
  const [money, setMoney] = useState();
  const [rgbEasy, setRgbEasy] = useState();
  const [rgbHard, setRgbHard] = useState();
  const [hexEasy, setHexEasy] = useState();
  const [hexHard, setHexHard] = useState();
  const [theme, setTheme] = useState();
  const [background, setBackground] = useState();

  let navigate = useNavigate()

  // dane z API
  async function getApiData() {
    try {
      const res = await fetch('https://color-rest-api.herokuapp.com/api/color/' + id, {
        method: 'GET'
      })
      const data = await res.json()
      setName(data.name)
      setMoney(data.money)
      setRgbEasy(data.easyRgb)
      setRgbHard(data.hardRgb)
      setHexEasy(data.easyHex)
      setHexHard(data.hardHex)
      setTheme(data.theme)
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
    getApiData()
  }, [getData])

  useEffect(() => {
    if (theme === 0) {
      setBackground({ backgroundImage: `url(${bg0})` })
    } else if (theme === 1) {
      setBackground({ backgroundImage: `url(${bg1})` })
    } else if (theme === 2) {
      setBackground({ backgroundImage: `url(${bg2})` })
    } else {
      setBackground({ backgroundImage: `url(${bg3})` })
    }
  }, [theme])
  
  // funkcja tworząca losowy kolor rgb
  const randomColor = () => {
    let c1 = Math.floor(Math.random() * 256);
    let c2 = Math.floor(Math.random() * 256);
    let c3 = Math.floor(Math.random() * 256);
    
    if (mode === 'rgb') {
      return "rgb(" + String(c1) + ", " + String(c2) + ", " + String(c3) + ")";
    } else {
      return "#" + ('0' + c1.toString(16).toUpperCase()).slice(-2) + ('0' + c2.toString(16).toUpperCase()).slice(-2) + ('0' + c3.toString(16).toUpperCase()).slice(-2);
    }
  }

  const win = () => {
    setGamePoints(gamePoints + 1)
    setGameMessage('Correct')
    setRenderNew(renderNew ? false : true)
  }

  const lose = () => {
    let hearts = gameHearts - 1
    setGameHearts(hearts)
    if (hearts === 0) {
      setDisplayedHearts('')
      gameOver()
      return
    } else if (hearts === 1){
      setDisplayedHearts('❤️')
    } else {
      setDisplayedHearts('❤️❤️')
    }
    setGameMessage('Wrong')
  }

  const gameOver = () => {
    setButtonVis('visible')
    setIsOver(true)
    if (gamePoints > 0) {
      updateMoney()
    }
    updateHighscores()
  }

  const updateMoney = () => {
    let newMoney = money
    if (difficulty === 'easy') {
      newMoney = newMoney + gamePoints
    } else {
      newMoney = newMoney + (gamePoints * 2)
    }

    let body = { "money": newMoney }
    updateApi(body)
  }

  const updateHighscores = () => {
    if (mode === 'rgb') {
      if (difficulty === 'easy') {
        if (gamePoints > rgbEasy) {
          let body = { "easyRgb": gamePoints }
          updateApi(body)
          setGameMessage(`GG! New record: ${gamePoints}`)
          return
        }
      } else {
        if (gamePoints > rgbHard) {
          let body = { "hardRgb": gamePoints }
          updateApi(body)
          setGameMessage(`GG! New record: ${gamePoints}`)
          return
        }
      }
    } else {
      if (difficulty === 'easy') {
        if (gamePoints > hexEasy) {
          let body = { "easyHex": gamePoints }
          updateApi(body)
          setGameMessage(`GG! New record: ${gamePoints}`)
          return
        }
      } else {
        if (gamePoints > hexHard) {
          let body = { "hardHex": gamePoints }
          updateApi(body)
          setGameMessage(`GG! New record: ${gamePoints}`)
          return
        }
      }
    }
    setGameMessage('Game over!')
  }

  const newGame = () => {
    setRenderNew(renderNew ? false : true)
    setGameHearts(3)
    setGamePoints(0)
    setButtonVis('hidden')
    setGameMessage("Let's play!")
    setIsOver(false)
    setDisplayedHearts('❤️❤️❤️')
  }

  const changeToEasy = () => {
    if (difficulty !== 'easy') {
      setDifficulty('easy')
      setEasyStyles({backgroundColor: 'rgba(255,255,255,0.8)', color: 'black'})
      setHardStyles({backgroundColor: 'rgba(255,255,255,0.2)', color: 'white'})
      newGame()
    }
  }

  const changeToHard = () => {
    if (difficulty !== 'hard') {
      setDifficulty('hard')
      setEasyStyles({backgroundColor: 'rgba(255,255,255,0.2)', color: 'white'})
      setHardStyles({backgroundColor: 'rgba(255,255,255,0.8)', color: 'black'})
      newGame()
    }
  }

  const changeToRgb = () => {
    if (mode !== 'rgb') {
      setMode('rgb')
      setRgbStyles({backgroundColor: 'rgba(255,255,255,0.8)', color: 'black'})
      setHexStyles({backgroundColor: 'rgba(255,255,255,0.2)', color: 'white'})
      newGame()
    }
  }

  const changeToHex = () => {
    if (mode !== 'hex') {
      setMode('hex')
      setRgbStyles({backgroundColor: 'rgba(255,255,255,0.2)', color: 'white'})
      setHexStyles({backgroundColor: 'rgba(255,255,255,0.8)', color: 'black'})
      newGame()
    }
  }

  // style={background}

  return (
    <div className='game'>
      <div className='game-top'>
        <div className='game-top-cont'>
          <h2>Your name: {name}</h2>
          <h4>Money: {money}</h4>
        </div>
        <div className='game-top-cont'>
          <h3>Change difficulty:</h3>
          <button 
            className='game-top-cont-topbt'
            type="button"
            onClick={changeToEasy}
            style={easyStyles}>
              Easy
          </button>
          <button 
            className='game-top-cont-botbt'
            type="button"
            onClick={changeToHard}
            style={hardStyles}>
              Hard
          </button>
        </div>
        <div className='game-top-cont'>
          <h3>Change mode:</h3>
          <button 
            className='game-top-cont-topbt'
            type="button"
            onClick={changeToRgb}
            style={rgbStyles}>
              rgb()
          </button>
          <button 
            className='game-top-cont-botbt'
            type="button"
            onClick={changeToHex}
            style={hexStyles}>
              #hex
          </button>
        </div>
        <div className='game-top-cont'>
          <h2>Hearts: {displayedHearts}</h2>
          <h4>Points: {gamePoints}</h4>
        </div>
      </div>

      <div className='game-window' style={background}>
        <div className='game-window-correct'>
          <h1>{correct}</h1>
        </div>
        <h3>{gameMessage}</h3>
        <ModeChanger
          difficulty={difficulty}
          randomColor={randomColor} 
          correct={correct} 
          setCorrect={setCorrect}
          renderNew={renderNew}
          win={win}
          lose={lose}
          isOver={isOver}
        />
        <button 
          className="game-window-newgame"
          style={{visibility: buttonVis}}
          onClick={newGame}>
            New Game
        </button>
      </div>
    </div>
  )
}

export default Game