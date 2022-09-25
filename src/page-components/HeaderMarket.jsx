import React from 'react'
import '../css/Header.css'
import market from '../images/market.png'

const HeaderMarket = () => {
  return (
    <div className='header'>
      <div className='header-content'>
        <h1 className='text-focus-in'>COLOR.MS Market - buy new things for money you earned!</h1>
        <p>Here you can spend coins, that you collected by playing the <b>game</b>. You can choose from different beautiful backgrounds for your <b>game window</b>. No worries, there sure will be <b>more in the future</b>!</p>
        <p className='tracking-in-expand-fwd-bottom'>Let's go on a <b><u>shopping spree</u></b>!</p>
      </div>
      <div className='header-content-image scale-up-hor-center'>
        <img src={market} alt="market" />
      </div>
    </div>
  )
}

export default HeaderMarket