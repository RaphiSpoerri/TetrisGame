 
const SHAPES = [SQUARE, RECTANGLE, STAIRS, BRACKET, MOUNTAIN];

const RANDOM_SHAPE = () => SHAPES[randint(0, 4)];


document.getElementById("right").onclick = moveRight;

document.getElementById("left").onclick = moveLeft;

document.getElementById("up").onclick = () => {
  if (document.getElementById("end").innerHTML == "GAME OVER")
    return;
  GAME_DATA.currentShape.rotate();
  updateMinos();
}

document.getElementById("f").onclick = () => {
  if(GAME_DATA.currentShape.flip !== undefined) {
    GAME_DATA.currentShape.flip();
    updateMinos();
  }
};

document.onkeydown = function(event) {
  if (document.getElementById("end").innerHTML == "GAME OVER")
    return;
  const minos = GAME_DATA.currentShape.getMinos();
  switch(event.key) {
    case 'ArrowRight':
      moveRight();
      break;
    case 'ArrowLeft':
      moveLeft();
      break;
    case 'ArrowDown':
      if (GAME_DATA.speed != 40) {
        GAME_DATA.backupSpeed = GAME_DATA.speed;
        GAME_DATA.speed = 40;
      }
      break;
    case 'ArrowUp':
      GAME_DATA.currentShape.rotate();
      updateMinos();
      break;
    case 'f':
      if(GAME_DATA.currentShape.flip !== undefined) {
        GAME_DATA.currentShape.flip();
        updateMinos();
      }
      break;
  }
}

document.onkeyup = event => {
  if(event.key == 'ArrowDown')
    GAME_DATA.speed = GAME_DATA.backupSpeed;
}

const START_STOP = document.getElementById("go");
GAME_DATA.screen = new MATRIX_100x220();
async function run() {
  if (START_STOP.innerHTML == "Pause") {
    alert('Game paused. Click `OK\' to resume.');
    return;
  }
  START_STOP.innerHTML = "Pause";
  START_STOP.style.backgroundColor = "red";
  document.getElementById("end").innerHTML = "";
  document.getElementById("score").innerHTML = "0";
  SVG.innerHTML = "";
  for (;;) {
    GAME_DATA.currentShape = new (RANDOM_SHAPE());

    var minos = GAME_DATA.currentShape.getMinos();
    var xs = minos.map(m=>m.x);
    var min = Math.min(...xs);
    var max = Math.max(...xs);
    var dif = max - min + 1;
    pointer.setAttribute('width', `${dif * 15}`);
    pointer.setAttribute('x', (min-1) * 15);

    pointer.setAttribute('fill', minos[0].node.getAttribute('fill'));
    
    while (GAME_DATA.currentShape.downOne()) {
      await sleep(GAME_DATA.speed / 8);
      await sleep(GAME_DATA.speed / 8);
      await sleep(GAME_DATA.speed / 8);
      await sleep(GAME_DATA.speed / 8);
      await sleep(GAME_DATA.speed / 8);
      await sleep(GAME_DATA.speed / 8);
      await sleep(GAME_DATA.speed / 8);
      await sleep(GAME_DATA.speed / 8);
    }
    GAME_DATA.screen.attachShape(GAME_DATA.currentShape);

    for (var cell of GAME_DATA.screen.topRow()) {
      if (cell != null) {
        await sleep(400);
        document.getElementById("end").innerHTML = "GAME OVER";
        START_STOP.innerHTML = "Play";
        START_STOP.style.backgroundColor = "lime";
        GAME_DATA.screen = new MATRIX_100x220();
        return;
      }
    }
  }
}

