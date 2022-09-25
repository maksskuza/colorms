import React, { useState, useEffect } from 'react'
import Colorbox from './Colorbox';

const Hard = (props) => {
  const [color1, setColor1] = useState('');
  const [color2, setColor2] = useState('');
  const [color3, setColor3] = useState('');
  const [color4, setColor4] = useState('');
  const [color5, setColor5] = useState('');
  const [color6, setColor6] = useState('');
  const [isVisible1, setIsVisible1] = useState('visible');
  const [isVisible2, setIsVisible2] = useState('visible');
  const [isVisible3, setIsVisible3] = useState('visible');
  const [isVisible4, setIsVisible4] = useState('visible');
  const [isVisible5, setIsVisible5] = useState('visible');
  const [isVisible6, setIsVisible6] = useState('visible');
  const colors1 = [
    {id: 1, color: color1, visibility: isVisible1},
    {id: 2, color: color2, visibility: isVisible2}, 
    {id: 3, color: color3, visibility: isVisible3}
  ];

  const colors2 = [
    {id: 4, color: color4, visibility: isVisible4},
    {id: 5, color: color5, visibility: isVisible5},
    {id: 6, color: color6, visibility: isVisible6}
  ]

  const getColors = () => {
    let c1 = props.randomColor();
    let c2 = props.randomColor();
    let c3 = props.randomColor();
    let c4 = props.randomColor();
    let c5 = props.randomColor();
    let c6 = props.randomColor();

    var rand = Math.floor(Math.random() * 6) + 1;
        
    if (rand === 1) {
      props.setCorrect(c1);
    } else if (rand === 2) {
      props.setCorrect(c2);
    } else if (rand === 3) {
      props.setCorrect(c3);
    } else if (rand === 4) {
      props.setCorrect(c4);
    } else if (rand === 5) {
      props.setCorrect(c5);
    } else {
      props.setCorrect(c6);
    }

    setColor1(c1);
    setColor2(c2);
    setColor3(c3);
    setColor4(c4);
    setColor5(c5);
    setColor6(c6);
  }

  useEffect(() => {
    setIsVisible1('visible')
    setIsVisible2('visible')
    setIsVisible3('visible')
    setIsVisible4('visible')
    setIsVisible5('visible')
    setIsVisible6('visible')
    getColors();
  }, [props.renderNew])

  return (
    <div>
      <div className='first-row'>
      { /* dynamiczne renderowanie komponentu Colorbox dla kazdego z kolorow z listy */ }
      {colors1.map((box) => <Colorbox 
        key={box.id}
        id={box.id} 
        color={box.color} 
        visibility={box.visibility}
        correct={props.correct}
        setIsVisible1={setIsVisible1}
        setIsVisible2={setIsVisible2}
        setIsVisible3={setIsVisible3}
        setIsVisible4={setIsVisible4}
        setIsVisible5={setIsVisible5}
        setIsVisible6={setIsVisible6}
        win={props.win}
        lose={props.lose}
        isOver={props.isOver}
      />)}
      </div>
      <div className='second-row'>
      {colors2.map((box) => <Colorbox 
        key={box.id}
        id={box.id} 
        color={box.color} 
        visibility={box.visibility}
        correct={props.correct}
        setIsVisible1={setIsVisible1}
        setIsVisible2={setIsVisible2}
        setIsVisible3={setIsVisible3}
        setIsVisible4={setIsVisible4}
        setIsVisible5={setIsVisible5}
        setIsVisible6={setIsVisible6}
        win={props.win}
        lose={props.lose}
        isOver={props.isOver}
      />)}
      </div>
    </div>
  )
}

export default Hard