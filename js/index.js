class Car {
    keyDown = {
        up: false,
        bottom: false,
      
        right: false,
        left: false,
      
        space: false
    }
    
    position = {
        x: 100,
        y: 100
    }
    
    // Параметры поворота руля от 0 до 1 
    // 0 - max left, 1 - max right
    // В режиме control переводим нажатия пользователя в поворот руля
    // от нейронки сразу получаем значение от 0 до 1 
    rudder = 0

    // Параметры нажатия педалии газа от 0 до 1 
    // В режиме control переводим нажатия пользователя силу нажатия педали
    // от нейронки сразу получаем значение от 0 до 1 
    gas = 0

    // Параметр фактического угла повората машины, высчитывается со времение 
    angle = 0
    speed = 0

    constructor(control) {
        if (control) {
            document.addEventListener('keydown', event => {
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
            });
    
            document.addEventListener('keyup', event => {
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
            });
        }

        setInterval(() => {
            if (this.speed < 40 * this.pressUp) {
                this.speed += 1 * this.pressUp
            } else if (this.speed > 40 * this.pressUp) {
                this.speed -= 1
            }

            if (this.keyDown.up) {
                this.position.y -= 10
            } else if (this.keyDown.bottom) {
                this.position.y += 10
            }
        }, 20)
    }
    
}

window.addEventListener("resize", function() {
    app.renderer.resize(window.innerWidth, window.innerHeight);
});

app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0xcccccc
    // transparent: true
});
document.body.appendChild(app.view);

let carSprite = PIXI.Sprite.from('./img/car.png');
app.stage.addChild(carSprite);
carSprite.anchor.set(0.5)


const car = new Car()

let elapsed = 0.0;
app.ticker.add((delta) => {
  elapsed += delta;

  carSprite.x = car.position.x
  carSprite.y = car.position.y
  carSprite.angle = car.angle
});

