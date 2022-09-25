import React from 'react'

const Colorbox = (props) => {

  const colorPick = () => {
    if (!props.isOver) {
      const picked = props.color
      if (props.correct === picked) {
        props.win()
      } else {
        props.lose()

        if (props.id === 1) {
          props.setIsVisible1('hidden')
        } else if (props.id === 2) {
          props.setIsVisible2('hidden')
        } else if (props.id === 3) {
          props.setIsVisible3('hidden')
        } else if (props.id === 4) {
          props.setIsVisible4('hidden')
        } else if (props.id === 5) {
          props.setIsVisible5('hidden')
        } else if (props.id === 6) {
          props.setIsVisible6('hidden')
        }
      }
    }
  }

  return (
    <button 
      type="button"
      className='box'
      onClick={colorPick}
      style={{backgroundColor: props.color, visibility: props.visibility}}>
    </button>
  )
}

export default Colorbox