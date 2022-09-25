import { useState, useCallback, useReducer } from 'react'
import { Graphics } from '@inlet/react-pixi';
import { Sprite, useTick} from '@inlet/react-pixi'
// import pointImg from '../images/point.png'


const Walls = (props) => {
    const Line = (props) => {
        const draw = useCallback(g => {
            g.clear()
            g.lineStyle(4, 0x000000, 1)
            props.line.points.forEach((point, index) => {
                if (index === 0) {
                    g.moveTo(point.x, point.y)
                } else {
                    g.lineTo(point.x, point.y)
                }
            })
            if (props.line.cycle && props.line.points.length >= 2) {
                g.lineTo(props.line.points[0].x, props.line.points[0].y)
            }
            
        }, [])

        return (
            <Graphics draw={draw} />
        )
    }
    
    return (
        <>
            {
                props.lines.map((line, index) => {
                    return (<Line line={line} key={index}/>)
                })
            }
            {
                props.points.map((point, index) => {
                    return (<Point point={point} key={point.coord.x + '' + point.coord.y}/>)
                })
            }
        </>
    )
}


const Point = (props) => {
    const [coord, setCoord] = useState({x: props.point.coord.x, y: props.point.coord.y})

    const draw = useCallback(g => {
        g.clear()
        g.lineStyle(0, 0x000000, 1)
        g.beginFill(0xff0000)
        g.drawCircle(0, 0, 7)
        g.endFill()
    }, [])

    const onDragStart = (event) => {
        const sprite = event.currentTarget;
        sprite.alpha = 0.5;
        sprite.data = event.data;
        sprite.dragging = true;
    };
    
    const onDragEnd = (event) => {
        const sprite = event.currentTarget;
        sprite.alpha = 1;
        sprite.dragging = false;
        sprite.data = null;
    };
    
    const onDragMove = (event) => {
        const sprite = event.currentTarget;
        if (sprite.dragging) {
            const newPosition = sprite.data.getLocalPosition(sprite.parent);
            props.point.setPoint({x: newPosition.x, y: newPosition.y})
            setCoord({x: newPosition.x, y: newPosition.y})
        }
    };
    
    return (
        <Graphics 
            draw={draw}
            anchor={0.5}
            x={coord.x}
            y={coord.y}
            interactive
            buttonMode
            pointerdown={onDragStart}
            pointerup={onDragEnd}
            pointerupoutside={onDragEnd}
            pointermove={onDragMove}
        />
    )
}

export default Walls