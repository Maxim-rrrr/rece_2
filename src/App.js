import {useReducer, useEffect, useState} from 'react'
import { Stage, Sprite, useTick, Container } from '@inlet/react-pixi'
import * as PIXI from 'pixi.js'
import CarClass from './modules/car.js'
import Car from './components/Car.js'
import Info from './components/Info.js'
import Inteface from './components/Interface.js'
import Walls from './components/Walls.js'
import WallsClass from './modules/walls.js'
import Layer from './modules/neuralNetwork/layer.js'
import Neuron from './modules/neuralNetwork/neuron.js'
import Net from './modules/neuralNetwork/net.js'
import TrackClass from './modules/track.js'
import Track from './components/Track.js'




// let l1 = new Layer(false, 7, 1, true)
// l1.mutation()
// console.log(l1)
// let l2 = new Layer(l1.exportData())
// console.log(l2.run([1,2,3,4,5,6,7]))
let net = new Net(false, [6,7,8,7,6,5,4,3,2])
net.mutation()
console.log(net.run([1,2,3,4,5,6,7]))
let net2 = new Net(net.exportData())
console.log(net2.run([1,2,3,4,5,6,7]))



let carStartParam = JSON.parse(localStorage.getItem('carStartParam'))
const car = new CarClass(carStartParam)

let wallsStartParam = JSON.parse(localStorage.getItem('wallsStartParam'))
const walls = new WallsClass(wallsStartParam)

const track = new TrackClass(car, walls)

function App() {
  const [screenWindow, setScreenWindow] = useState(window.innerWidth)
  const [screenHeight, setScreenHeight] = useState(window.innerHeight)

  const [carInteractive, setCarInteractive] = useState(false)
  const [hoverLine, setHoverLine] = useState(-1)
  const [editLine, setEditLine] = useState(-1)
  const [hoverPoint, setHoverPoint] = useState(-1)
  const [points, setPoints] = useState([])
  const [lines, setLines] = useState([])

  const infoReducer = (_, { data }) => data
  const [info, infoUpdate] = useReducer(infoReducer)


  const pointsForRender = () => {
    if (hoverPoint > -1) {
      setPoints([
        {
          lineIndex: editLine,
          index: hoverPoint,
          coord: walls.getLines()[editLine].points[hoverPoint],
          setPoint: (coord) => {walls.setPoint(editLine, hoverPoint, coord)}
        }
      ])
    } else if (editLine > -1) {
      let p = []
      walls.getLines()[editLine].points.forEach((point, index) => {
        p.push({
          lineIndex: editLine,
          index,
          coord: point,
          setPoint: (coord) => {walls.setPoint(editLine, index, coord)}
        })
      })
      setPoints(p)
    } else if (hoverLine > -1) {
      let p = []
      walls.getLines()[hoverLine].points.forEach((point, index) => {
        p.push({
          lineIndex: hoverLine,
          index,
          coord: point,
          setPoint: (coord) => {walls.setPoint(hoverLine, index, coord)}
        })
      })
      setPoints(p)
    } else {
      setPoints([])
    }
  }
  
  const addPoint = (event) => {
    if (editLine > -1) {
      walls.addPoint(editLine, {x: event.data.global.x, y: event.data.global.y})
      pointsForRender()
    }
  }

  useEffect(() => {
    window.addEventListener("resize", function() {
      setScreenWindow(window.innerWidth)
      setScreenHeight(window.innerHeight)
    });
  }, [])

  useEffect(() => {
    pointsForRender()

  }, [hoverLine, editLine, hoverPoint, walls])

  useEffect(() => {
    setLines(walls.getLines())
  }, [walls]) 


  return (
    <div>
      <Stage width={screenWindow} height={screenHeight} options ={{backgroundColor: 0xcccccc, interactive: true}}>
        <Sprite width={screenWindow} height={screenHeight} interactive buttonMode pointerup={addPoint} texture={PIXI.Texture.WHITE}/>
        <Walls lines={lines} points={points}/>
        {/* <Track track={track}/> */}
        <Car car={car} infoUpdate={infoUpdate} interactive={carInteractive}/>
      </Stage>
      <Info {...info}/>
      <Inteface 
        car={car} 
        walls={walls} 
        setCarInteractive={setCarInteractive} 
        setEditLine={setEditLine} 
        editLine={editLine} 
        setHoverLine={setHoverLine}
        setHoverPoint={setHoverPoint}
      />
    </div>
  )
}

export default App;
