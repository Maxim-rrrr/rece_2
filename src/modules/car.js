class Car {
    width = 18
    len = 36 

    characteristics = {
        adhesionCoefficient: 0.5,
        weight: 1960,
        enginePowerLimit: 160
    }

    maxSpeed = this.characteristics.enginePowerLimit * 736 / this.characteristics.weight
    
    keyDown = {
        up: false,
        bottom: false,
      
        right: false,
        left: false,
      
        space: false
    }

    neuralInputValue = {
        gas: 0,
        rudder: 0.5,
    }

    // Параметры поворота руля от 0 до 1 
    // 0 - max left, 1 - max right
    // В режиме control переводим нажатия пользователя в поворот руля
    rudder = 0.5

    // Параметры нажатия педалии газа от 0 до 1 
    // В режиме control переводим нажатия пользователя силу нажатия педали 
    gas = 0

    // Параметр фактического угла повората машины, высчитывается со времение от rudder
    angle = 76
    // Направление инерции
    directionInertia = 76

    // На сколько процентов работает двигатель
    enginePower = 0
    // Обороты двигателя
    engineSpeed = 0
    // Передача
    transmission = 0
    switchingTransmission = false
    // Параметр фактической скорости машины, высчитывается со времение от gas
    speed = 0

    position = {
        x: 288, 
        y: 213
    }

    control = false
    neuralControl = false

    constructor(startParams) {
        if (startParams) {
            this.position = startParams.position
            this.angle = startParams.angle
            this.directionInertia = startParams.angle
        }

        // control
        document.addEventListener('keydown', event => {
            if (this.control) {
                if (event.code == 'KeyW') {
                    this.keyDown.up = true
                }
                if (event.code == 'KeyD') {
                    this.keyDown.right = true
                } 
                if (event.code == 'KeyS') {
                    this.keyDown.bottom = true
                } 
                if (event.code == 'KeyA') {
                    this.keyDown.left = true
                } 
            }
        });

        document.addEventListener('keyup', event => {
            if (this.control) {
                if (event.code == 'KeyW') {
                    this.keyDown.up = false
                }
                if (event.code == 'KeyD') {
                    this.keyDown.right = false
                } 
                if (event.code == 'KeyS') {
                    this.keyDown.bottom = false
                } 
                if (event.code == 'KeyA') {
                    this.keyDown.left = false
                } 
            }
        });


        setInterval(() => {
            // control
            // Перевод нажатия клавишь в поворот руля
            if (this.control) {
                if (this.keyDown.right) {
                    if (this.rudder < 1) {
                        this.rudder += 0.05
                        if (this.rudder > 1) {
                            this.rudder = 1
                        }
                    }
                } else if (this.keyDown.left) {
                    if (this.rudder > 0) {
                        this.rudder -= 0.05
                        if (this.rudder < 0) {
                            this.rudder = 0
                        }
                    }
                } else {
                    if (this.rudder != 0.5) {
                        if (this.rudder > 0.5) {
                            this.rudder -= 0.05
                            if (this.rudder < 0.5) {
                                this.rudder = 0.5
                            }
                        } else {
                            this.rudder += 0.05
                            if (this.rudder > 0.5) {
                                this.rudder = 0.5
                            }
                        }
                    }
                }
    
                // Перевод нажатия клавишь в нажатие педали газа
                if (this.keyDown.up) {
                    if (this.gas < 1) {
                        this.gas += 0.05
                        if (this.gas > 1) {
                            this.gas = 1
                        }
                    }
                } else if (this.keyDown.bottom) {
                    if (this.gas > 0) {
                        this.gas -= 0.1
                        if (this.gas < 0) {
                            this.gas = 0
                        }
                    }
                } else if (!this.keyDown.up) {
                    if (this.gas > 0) {
                        this.gas -= 0.05
                        if (this.gas < 0) {
                            this.gas = 0
                        }
                    }
                } 
            }

            // neuralControl
            if (this.neuralControl) {
                // Перевод ввод нейронки в нажатия педали газа
                if (this.neuralInputValue.gas != this.gas) {
                    if (this.neuralInputValue.gas < this.gas) {
                        this.gas -= 0.1
                        if (this.neuralInputValue.gas > this.gas) {
                            this.gas = this.neuralInputValue.gas
                        }
                    } else {
                        this.gas += 0.1
                        if (this.neuralInputValue.gas < this.gas) {
                            this.gas = this.neuralInputValue.gas
                        }
                    }
                }

                // Перевод ввод нейронки в поворот руля
                if (this.neuralInputValue.rudder != this.rudder) {
                    if (this.neuralInputValue.rudder < this.rudder) {
                        this.rudder -= 0.05
                        if (this.neuralInputValue.rudder > this.rudder) {
                            this.rudder = this.neuralInputValue.rudder
                        }
                    } else {
                        this.rudder += 0.05
                        if (this.neuralInputValue.rudder < this.rudder) {
                            this.rudder = this.neuralInputValue.rudder
                        }
                    }
                }
            }


            // Рассчёт мощьности двигателя
            if (this.enginePower != this.gas) {
                if (this.enginePower < this.gas) {
                    this.enginePower += 0.003 * (this.gas - this.enginePower)
                } else {
                    this.enginePower -= 0.01
                    if (this.enginePower < 0) {
                        this.enginePower = 0
                    }
                }
            }

            // Рассчёт передачи
            if (!this.switchingTransmission) {
                if (this.enginePower == 0) {
                    this.transmission = 0
                } else if (this.enginePower > 1 / 5 * this.transmission) {
                    this.transmissionUp()
                } else if (this.enginePower < 1 / 5 * this.transmission - 1 / 5) {
                    this.transmissionDown()
                }
            }

            // Рассчёт оборотов двигателя
            if (this.switchingTransmission) {
                this.engineSpeed = 2000
            } else if (this.transmission == 0) {
                this.engineSpeed = 1200
            } else {
                this.engineSpeed = this.enginePower / this.transmission * 3000 * 5
            }
            
            
            // Рассчёт скорости
            let expectationSpeed = this.engineSpeed * this.transmission / (3000 * 5) * this.maxSpeed
            if (this.speed != expectationSpeed) {
                if (this.speed < expectationSpeed) {
                    this.speed += expectationSpeed - this.speed / 10
                } else {
                    this.speed -= this.speed - expectationSpeed / 10
                }
            }
            
            // Расчёт угла поворота машины
            this.angle += 0.15 * (this.rudder * 2 - 1) * this.speed

            if (this.speed / this.maxSpeed > this.characteristics.adhesionCoefficient) {
                this.directionInertia += (this.angle - this.directionInertia) * (1 - (((this.speed / this.maxSpeed) - this.characteristics.adhesionCoefficient) * 3))
            } else {
                this.directionInertia = this.angle
            }


            this.position.y -= this.speed / 3 * (Math.cos((this.directionInertia % 360) * (Math.PI / 180)))
            this.position.x += this.speed / 3 * (Math.sin((this.directionInertia % 360) * (Math.PI / 180)))
        }, 20)
    }

    neuralInput (gas, rudder) {
        this.neuralInputValue.gas = gas
        this.neuralInputValue.rudder = rudder
    }

    // 0 - без контроля, 1 - ручное управление, 2 - управление нейронки
    setDriver(id) {
        if (id === 0) {
            this.control = false
            this.neuralControl = false
            this.keyDown = {
                up: false,
                bottom: false,
              
                right: false,
                left: false,
              
                space: false
            }
        
            this.neuralInputValue = {
                gas: 0,
                rudder: 0.5,
            }
        } else if (id === 1) {
            this.control = true
            this.neuralControl = false
            this.neuralInputValue = {
                gas: 0,
                rudder: 0.5,
            }
        } else if (id === 2) {
            this.control = false
            this.neuralControl = true
            this.keyDown = {
                up: false,
                bottom: false,
              
                right: false,
                left: false,
              
                space: false
            }
        }
    }

    setPosition(coord) {
        this.position = coord 

        this.saveStartParams()
    }

    setAngle(angle) {
        this.angle = angle
        this.directionInertia = angle

        this.saveStartParams()
    }

    getSpeed(param = 'km/h') {
        if (param == 'km/h') {
            return this.speed * 3.6
        } 

        return this.speed
    }

    getEngineSpeed() {
        return this.engineSpeed
    }

    getTransmission() {
        return this.transmission
    }

    getInfo() {
        return {
            speed: Math.round(this.getSpeed()) + ' km/h',
            engineSpeed: Math.round(this.getEngineSpeed()) + ' об./мин.',
            transmission: (this.getTransmission() == 0 ? 'N' : this.getTransmission()) + ' передача',
        }
    }

    transmissionUp() {
        if (this.transmission == 0) {
            this.transmission += 1
        } else {
            this.switchingTransmission = true
            setTimeout(() => {
                this.transmission += 1
                this.switchingTransmission = false
            }, 100)
        }
    }

    transmissionDown() {
        this.switchingTransmission = true
        setTimeout(() => {
            this.transmission -= 1
            this.switchingTransmission = false
        }, 100)
    }

    getBodyLine() {
        let corner = (Math.atan(this.width / this.len) * 180) / Math.PI
        let diagonal = Math.sqrt(this.width * this.width + this.len * this.len)
        return [
            [
                {
                    x: this.position.x + (diagonal / 2) * Math.sin((this.angle + corner) * (Math.PI / 180)),
                    y: this.position.y - (diagonal / 2) * Math.cos((this.angle + corner) * (Math.PI / 180))
                },
                {
                    x: this.position.x + (diagonal / 2) * Math.sin((this.angle + 180 - corner) * (Math.PI / 180)),
                    y: this.position.y - (diagonal / 2) * Math.cos((this.angle + 180 - corner) * (Math.PI / 180))
                }
            ],
            [
                {
                    x: this.position.x + (diagonal / 2) * Math.sin((this.angle - corner) * (Math.PI / 180)),
                    y: this.position.y - (diagonal / 2) * Math.cos((this.angle - corner) * (Math.PI / 180))
                },
                {
                    x: this.position.x + (diagonal / 2) * Math.sin((this.angle - 180 + corner) * (Math.PI / 180)),
                    y: this.position.y - (diagonal / 2) * Math.cos((this.angle - 180 + corner) * (Math.PI / 180))
                }
            ]
        ]

    }

    getParams() {
        return {
            x: this.position.x,
            y: this.position.y,
            angle: this.angle
        }
    }

    saveStartParams() {
        localStorage.setItem('carStartParam', JSON.stringify({
                position: this.position,
                angle: this.angle
            })
        )
    }
}

export default Car