const MATRIX_100x220 = function() {
  var data = [];
  var rec = [null].concat([0].repeat(22));
  for(let y = 1; y <= 22; y++) {
    data[y] = [];

    for (let x = 1; x <= 10; x++) {
      data[y][x] = null;
    }
  }
  this.attachShape = async function(shape) {
    const minos = shape.getMinos();
    const positions = minos.map(mino => mino.position);
    positions.forEach((position, n) => {
      const [x, y] = position;
      data  [y][x] = minos[n];
      rec[y] += 1;
    });
    for(var y = 1; y <= 22; y++) {
      while (rec[y] > 9) {
        for(var y_idx = y; y_idx > 0; y_idx--) {
          for(var x_idx = 1; x_idx <= 10; x_idx++) {
            (data[y_idx][x_idx] || {}).y += 1;
          }
        }
        data[y].forEach(px=>px && px.remove());
        data.splice(y, 1);
        data.splice(1, 0, [undefined].concat([null].repeat(22)));
        rec.splice(y, 1);
        rec.splice(1, 0, 0);
        const SCORE = document.getElementById("score");
        SCORE.innerHTML = (parseInt(SCORE.innerHTML) + 10).toString();
      }
    }
  };
  this.isEmpty = function(x, y) {
    return !(data[y][x]);
  };
  this.topRow = function() {
    return data[1];
  }
};
