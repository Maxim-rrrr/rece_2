window.addEventListener("resize", function() {
    app.renderer.resize(window.innerWidth, window.innerHeight);
    bg.width = app.screen.width;
    bg.height = app.screen.height;
});

app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0xcccccc
    // transparent: true
});
document.body.appendChild(app.view);

// Фон
let bg = new PIXI.Sprite(PIXI.Texture.WHITE);
bg.width = app.screen.width;
bg.height = app.screen.height;
bg.tint = 0xcccccc;
bg.interactive = true;
bg.on('click', function(e) {
  console.log(e.data.global);
});
app.stage.addChild(bg);


// Спрайт машины
let carSprite = PIXI.Sprite.from('./img/car.png');
carSprite.height = 52
carSprite.width= 26
app.stage.addChild(carSprite);
carSprite.anchor.set(0.5)

const car = new Car(carSprite, true)

function drawRoad() {
    const realPath = new PIXI.Graphics();
    realPath.lineStyle(2, 0xFFFFFF, 1);
    realPath.moveTo(0, 0);
    realPath.lineTo(100, 200);
    realPath.lineTo(200, 200);
    realPath.lineTo(240, 100);
    app.stage.addChild(realPath);
}

let elapsed = 0.0;
app.ticker.add((delta) => {
    elapsed += delta;

    car.render()
    document.querySelector('.speed').innerHTML = Math.round(car.getSpeed()) + ' km/h'
    document.querySelector('.engineSpeed').innerHTML = Math.round(car.getEngineSpeed()) + ' об./мин.'
    let transmission = car.getTransmission()
    document.querySelector('.transmission').innerHTML = (transmission == 0 ? 'N' : transmission) + ' передача'
});

