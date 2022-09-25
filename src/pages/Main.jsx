import React from 'react'
import Navbar from '../page-components/Navbar'
import HeaderMain from '../page-components/HeaderMain'
//import Game from '../game-components/Game'
import Game from '../game-components/Game'
import Footer from '../page-components/Footer'

const Main = () => {
  return (
    <div className='main'>
      <Navbar />
      <HeaderMain />
      <Game />
      <Footer />
    </div>
  )
}

export default Main