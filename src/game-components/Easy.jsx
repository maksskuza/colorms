import React, { useState, useEffect } from 'react'
import Colorbox from './Colorbox';

const Easy = (props) => {
  const [color1, setColor1] = useState('');
  const [color2, setColor2] = useState('');
  const [color3, setColor3] = useState('');
  const [isVisible1, setIsVisible1] = useState('visible');
  const [isVisible2, setIsVisible2] = useState('visible');
  const [isVisible3, setIsVisible3] = useState('visible');
  const colors = [
    {id: 1, color: color1, visibility: isVisible1},
    {id: 2, color: color2, visibility: isVisible2}, 
    {id: 3, color: color3, visibility: isVisible3}
  ];

  const getColors = () => {
    // losowanie 3 kolorow za pomoca fukcji z rodzica
    let c1 = props.randomColor();
    let c2 = props.randomColor();
    let c3 = props.randomColor();

    // losowanie i ustawianie jednego z 3 jako poprawnego
    var rand = Math.floor(Math.random() * 3) + 1;
        
    if (rand === 1) {
      props.setCorrect(c1);
    } else if (rand === 2) {
      props.setCorrect(c2);
    } else {
      props.setCorrect(c3);
    }

    // zapisywanie do listy 3 wylosowanych kolorow
    setColor1(c1);
    setColor2(c2);
    setColor3(c3);
  }

  useEffect(() => {
    setIsVisible1('visible')
    setIsVisible2('visible')
    setIsVisible3('visible')
    getColors();
  }, [props.renderNew])

  return (
    <div className='first-row'>
      { /* dynamiczne renderowanie komponentu Colorbox dla kazdego z kolorow z listy */ }
      {colors.map((box) => <Colorbox 
        key={box.id}
        id={box.id} 
        color={box.color} 
        visibility={box.visibility}
        correct={props.correct}
        setIsVisible1={setIsVisible1}
        setIsVisible2={setIsVisible2}
        setIsVisible3={setIsVisible3}
        win={props.win}
        lose={props.lose}
        isOver={props.isOver}
      />)}
    </div>
  )
}

export default Easy