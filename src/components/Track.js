import { useState, useCallback, useReducer } from 'react'
import { Graphics, useTick } from '@inlet/react-pixi';

const Track = (props) => {
    const [rays, setRays] = useState(props.track.getRays())
    const [raysCrossingWalls, setRaysCrossingWalls] = useState(props.track.getRaysCrossWalls())

    useTick(delta => {
        setRays(props.track.getRays())
        setRaysCrossingWalls(props.track.getRaysCrossWalls())
    })
    
    const draw = useCallback(g => {
        g.clear()
        g.lineStyle(2, 0x2596be, 1)
        rays.forEach((ray, index) => {
            g.moveTo(ray[0].x, ray[0].y)
            g.lineTo(ray[1].x, ray[1].y)
            
        })

        g.lineStyle(0, 0x000000, 1)
        raysCrossingWalls.forEach(ray => {
            g.beginFill(0xff0000)
            g.drawCircle(ray.point.x, ray.point.y, 3)
            g.endFill()
        })

    }, [rays])

    return (
        <Graphics draw={draw} />
    )
}

export default Track