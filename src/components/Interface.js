import { useState } from 'react'
import AngleInput from '../components/AngleInput.js'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';
import TimelineIcon from '@mui/icons-material/Timeline';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';

const Inteface = (props) => {
    const [tab, setTab] = useState(0)

    if (tab === 0) {
        return (
            <div className='interface'>
                <Stack spacing={2} direction="row">
                    <Button variant="contained" onClick={() => setTab(1)}>Редактировать</Button>
                    <Button variant="contained">Запустить обучение</Button>
                    <Button variant="contained" onClick={() => {
                        props.car.setDriver(1)
                        setTab(2)
                    }}>Ехать самому</Button>
                </Stack>
            </div>
        )
    } else if (tab === 1) {
        return (
            <div className='interface'>
                <Stack spacing={2} direction="row">
                    <Button variant="contained" onClick={() => setTab(0)}>Назад</Button>
                    <Button variant="contained" onClick={() => {
                        setTab(3)
                        props.setCarInteractive(true)
                    }}>Переместить машину</Button>
                    <Button variant="contained" onClick={() => setTab(4)}>Повернуть машину</Button>
                    <Button variant="contained" onClick={() => setTab(5)}>Редактировать стены</Button>
                </Stack>
            </div>
        )
    } else if (tab === 2) {
        return (
            <div className='interface'>
                <Stack spacing={2} direction="row">
                    <Button variant="contained" onClick={() => {
                        setTab(0) 
                        props.car.setDriver(0)
                    }}>Назад</Button>
                    <span>Ручное управление</span>
                </Stack> 
            </div>
        )
    } else if (tab === 3) {
        return (
            <div className='interface'>
                <Stack spacing={2} direction="row">
                    <span>Перетащите машину</span>
                    <Button variant="contained" onClick={() => {
                        setTab(1) 
                        props.setCarInteractive(false)
                    }}>Назад</Button>
                    <Button variant="contained" onClick={() => props.car.setPosition({x: 100, y: 100})}>Вернуть на координаты (100;100)</Button>
                </Stack>
            </div>
        )
    } else if (tab === 4) {
        return (
            <div className='interface'>
                <Stack spacing={2} direction="row">
                    <Button variant="contained" onClick={() => {
                        setTab(1) 
                    }}>Назад</Button>
                    <AngleInput
                        className='angle-input default-input'
                        onInput={(newAngle) => props.car.setAngle(360 - newAngle + 90)}
                        onChange={(newAngle) => props.car.setAngle(360 - newAngle + 90)}
                        defaultValue={0}
                    />
                </Stack>
            </div>
        )
    } else if (tab === 5) {
        return (
            <div className='interface'>
                
                <Stack spacing={2} direction="column">
                    <div className='lines-list'>
                        {
                            props.walls.getLines().map((line, index) => {
                                return (
                                    <div 
                                        className="lines-item" 
                                        onMouseOver={() => props.setHoverLine(index)} 
                                        onMouseOut={() => props.setHoverLine(-1)}
                                    >
                                        <div className='content-line'>
                                            <span>Line {index + 1} ({line.points.length} points)</span>
                                            {
                                                line.cycle ? 
                                                <ThreeSixtyIcon/> :
                                                <TimelineIcon/> 
                                            }
                                        </div>

                                        <div className='btns-line'>
                                            <button className="edit-line" onClick={() => {
                                                setTab(6)
                                                props.setHoverLine(-1)
                                                props.setEditLine(index)
                                            }}><ModeEditOutlineOutlinedIcon/></button>
                                            
                                            <button className="del-line" onClick={() => {
                                                props.setHoverLine(-1)
                                                props.walls.removeLine(index)
                                            }}>x</button>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <button className="add-line" onClick={() => props.walls.addLine()}>+</button>
                    </div>

                <Button variant="contained" onClick={() => {
                    setTab(1) 
                }}>Назад</Button>
                </Stack>
            </div>
        )
    } else if (tab === 6) {
        return (
            <div className='interface'>
                <Stack spacing={2} direction="column">
                    <div className='lines-list'>
                        {
                            props.walls.getLines()[props.editLine].points.map((point, index) => {
                                return (
                                    <div 
                                        className="lines-item" 
                                        onMouseOver={() => props.setHoverPoint(index)} 
                                        onMouseOut={() => props.setHoverPoint(-1)}
                                    >
                                        <span>point {"{"} x: {Math.round(point.x)}; y: {Math.round(point.y)} {"}"}</span>
                                        <button className="del-line" onClick={() => {
                                            props.walls.removePoint(props.editLine, index)
                                            props.setHoverPoint(-1)
                                        }}>x</button>
                                    </div>
                                )
                            })
                        }
                        <button className="add-line" onClick={() => props.walls.setLineCycle(props.editLine)}>
                            {
                                props.walls.getLines()[props.editLine].cycle ? 
                                <TimelineIcon/> :
                                <ThreeSixtyIcon/>
                            }
                        </button>
                    </div>

                    <Button variant="contained" onClick={() => {
                        setTab(5) 
                        props.setEditLine(-1)
                    }}>Назад</Button>
                </Stack>
            </div>
        )
    }
    
}

export default Inteface