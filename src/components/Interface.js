import { useState } from 'react'
import AngleInput from '../components/AngleInput.js'
const Inteface = (props) => {
    const [tab, setTab] = useState(0)

    if (tab === 0) {
        return (
            <div className='interface'>
                <div className="tab">
                    <button onClick={() => setTab(1)}>Редактировать</button>
                    <button>Запустить обучение</button>
                    <button onClick={() => {
                        props.car.setDriver(1)
                        setTab(2)
                    }}>Ехать самому</button>
                </div>
            </div>
        )
    } else if (tab === 1) {
        return (
            <div className='interface'>
                <div className="tab">
                    <button onClick={() => setTab(0)}>Назад</button>
                    <button onClick={() => {
                        setTab(3)
                        props.setCarInteractive(true)
                    }}>Переместить машину</button>
                    <button onClick={() => setTab(4)}>Повернуть машину</button>
                    <button>Урать стены</button>
                    <button>Добавить стены</button>
                </div>   
            </div>
        )
    } else if (tab === 2) {
        return (
            <div className='interface'>
                <div className="tab">
                    <button onClick={() => {
                        setTab(0) 
                        props.car.setDriver(0)
                    }}>Назад</button>
                    <span>Ручное управление</span>
                </div>   
            </div>
        )
    } else if (tab === 3) {
        return (
            <div className='interface'>
                <div className="tab">
                    <span>Перетащите машину</span>
                    <button onClick={() => {
                        setTab(0) 
                        props.setCarInteractive(false)
                    }}>Назад</button>
                    <button onClick={() => props.car.setPosition({x: 100, y: 100})}>Вернуть на координаты (100;100)</button>
                </div>   
            </div>
        )
    } else if (tab === 4) {
        return (
            <div className='interface'>
                <div className="tab">
                    <button onClick={() => {
                        setTab(0) 
                    }}>Назад</button>
                    <AngleInput
                        className='angle-input default-input'
                        onInput={(newAngle) => props.car.setAngle(360 - newAngle + 90)}
                        onChange={(newAngle) => props.car.setAngle(360 - newAngle + 90)}
                        defaultValue={0}
                    />
                </div>   
            </div>
        )
    }
    
}

export default Inteface