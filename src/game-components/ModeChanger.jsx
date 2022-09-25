import React from 'react'
import Easy from './Easy'
import Hard from './Hard'

const ModeChanger = (props) => {

  if (props.difficulty === 'easy') {
    return (
      <Easy
        randomColor={props.randomColor} 
        correct={props.correct} 
        setCorrect={props.setCorrect}
        renderNew={props.renderNew}
        win={props.win}
        lose={props.lose}
        isOver={props.isOver}
      />
    )
  } else if (props.difficulty === 'hard') {
    return (
      <Hard
        randomColor={props.randomColor} 
        correct={props.correct} 
        setCorrect={props.setCorrect}
        renderNew={props.renderNew}
        win={props.win}
        lose={props.lose}
        isOver={props.isOver}
      />
    )
  }
}

export default ModeChanger