import { useReducer } from 'react'
import { Sprite, useTick} from '@inlet/react-pixi'

import carImg from '../images/car.png'

const Car = (props) => {
    const reducer = (_, { data }) => data
    const [motion, update] = useReducer(reducer)
  
    useTick(() => {
      update({
        type: 'update',
        data: props.car.getParams(),
      })
      if (props.infoUpdate) {
        props.infoUpdate({
            type: 'update',
            data: props.car.getInfo(),
        })
      }
    })

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
        props.car.setPosition({x: newPosition.x, y: newPosition.y})
      }
    };
    
    return (
      <Sprite 
        image={carImg} 
        height={36}
        width={18}
        anchor={0.5}
        {...motion}
        interactive={props.interactive}
        buttonMode={props.interactive}
        pointerdown={onDragStart}
        pointerup={onDragEnd}
        pointerupoutside={onDragEnd}
        pointermove={onDragMove}
      />
    )
}

export default Car