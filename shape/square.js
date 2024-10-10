const SQUARE = function() {
  const TEMPLATE = new PIXEL_TEMPLATE();
  var [c, d] = COLORS[randint(0, 11)];
  TEMPLATE.color = c;
  TEMPLATE.darkColor = d;
  TEMPLATE.x = TEMPLATE.y = '0';
  const PIXELS = [];
  for(let _ = 0; _ < 4; _++) {
    PIXELS.push(TEMPLATE.insert());
  }
  PIXELS[0].position = [5, 1];
  PIXELS[1].position = [5, 2];
  PIXELS[2].position = [6, 1];
  PIXELS[3].position = [6, 2];

  this.downOne = function() {
    for(const pixel of PIXELS)
      if(pixel.y == 22
        || !GAME_DATA.screen.isEmpty(pixel.x, pixel.y+1))
        return false;

    for(var px = 0; px < 4; px++)
      PIXELS[px].y = PIXELS[px].y + 1;
    return true;
  };
  this.getMinos = function() {
    return PIXELS;
  };
  this.moveMinos = function(units) {
    PIXELS.forEach(px => px.x += units);
  }
	this.rotate = () => undefined;
};

