import {useReducer, useEffect, useState} from 'react'
import { Stage, Sprite, useTick, Container } from '@inlet/react-pixi'
import CarClass from './modules/car.js'
import Car from './components/Car.js'
import Info from './components/Info.js'
import Inteface from './components/Interface.js'

const car = new CarClass()

function App() {
  const [screenWindow, setScreenWindow] = useState(window.innerWidth)
  const [screenHeight, setScreenHeight] = useState(window.innerHeight)

  const [carInteractive, setCarInteractive] = useState(false)

  useEffect(() => {
    window.addEventListener("resize", function() {
      setScreenWindow(window.innerWidth)
      setScreenHeight(window.innerHeight)
    });
  }, [])

  const infoReducer = (_, { data }) => data
  const [info, infoUpdate] = useReducer(infoReducer)

  

  return (
    <div>
      <Stage width={screenWindow} height={screenHeight} options ={{backgroundColor: 0xcccccc, interactive: true}} >
        <Car car={car} infoUpdate={infoUpdate} interactive={carInteractive}/>
      </Stage>
      <Info {...info}/>
      <Inteface car={car} setCarInteractive={setCarInteractive}/>
    </div>
  )
}

export default App;
