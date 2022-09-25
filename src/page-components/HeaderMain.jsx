import React from 'react'
import '../css/Header.css'
import colorbrush from '../images/colorbrush.png'

const HeaderMain = () => {
  return (
    <div className='header'>
      <div className='header-content'>
        <h1 className='text-focus-in'>COLOR.MS Game - enhance your color recognition skills!</h1>
        <p>Guess colors based on their <b>rgb</b> or <b>hex</b> representation. For each correct guess, get <b>1</b> or <b>2</b> coins, depending on difficulty. Later on, you can spend your coins on the <b>market</b> and compare your highscores with other players on <b>leaderboard</b>.</p>
        <p className='tracking-in-expand-fwd-bottom'>Most importantly, <b><u>dont cheat</u></b>!</p>
      </div>
      <div className='header-content-image scale-up-hor-center'>
        <img src={colorbrush} alt="color" />
      </div>
    </div>
  )
}

export default HeaderMain