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
carSprite.height = 52
carSprite.width= 26
app.stage.addChild(carSprite);
carSprite.anchor.set(0.5)

const car = new Car(carSprite, true)

let elapsed = 0.0;
app.ticker.add((delta) => {
    elapsed += delta;

    car.render()
    document.querySelector('.speed').innerHTML = Math.round(car.getSpeed()) + ' km/h'
    document.querySelector('.engineSpeed').innerHTML = Math.round(car.getEngineSpeed()) + ' об./мин.'
    let transmission = car.getTransmission()
    document.querySelector('.transmission').innerHTML = (transmission == 0 ? 'N' : transmission) + ' передача'
});

