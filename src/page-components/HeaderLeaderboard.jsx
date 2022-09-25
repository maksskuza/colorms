import React from 'react'
import '../css/Header.css'
import podium from '../images/podium.png'

const HeaderLeaderboard = () => {
  return (
    <div className='header'>
      <div className='header-content'>
        <h1 className='text-focus-in'>COLOR.MS Leaderboard - compare your highscores with others!</h1>
        <p>On this page you can check all your <b>highscores</b>. A bit lower, you can find the <b>Top 10</b> tables for every mode and difficulty. Are you the <b>leader</b>?</p>
        <p className='tracking-in-expand-fwd-bottom'>Come on, <b><u>let's check</u></b>!</p>
      </div>
      <div className='header-content-image scale-up-hor-center'>
        <img src={podium} alt="podium" />
      </div>
    </div>
  )
}

export default HeaderLeaderboard