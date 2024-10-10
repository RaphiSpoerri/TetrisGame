const RECTANGLE = function() {
	const TEMPLATE = new PIXEL_TEMPLATE();
	var [c, d] = COLORS[randint(0, 5)];
	TEMPLATE.color = c;
	TEMPLATE.darkColor = d;
	TEMPLATE.x = '0';
	TEMPLATE.y = '0';
	const PIXELS = [];
	for(let _ = 0; _ < 4; _++) {
		PIXELS.push(TEMPLATE.insert());
	}
	this.ptr = 1;
	this.stages = [
		() => {
			var oldY = PIXELS[0].y;
      var oldX = PIXELS[0].x+1;
			PIXELS[0].position = [oldX, oldY+0];
			PIXELS[1].position = [oldX, oldY+1];
			PIXELS[2].position = [oldX, oldY+2];
			PIXELS[3].position = [oldX, oldY+3];
		},
		() => {
			var oldY = PIXELS[0].y;
      var oldX = PIXELS[0].x-1;
			PIXELS[0].position = [oldX+0, oldY];
			PIXELS[1].position = [oldX+1, oldY];
			PIXELS[2].position = [oldX+2, oldY];
			PIXELS[3].position = [oldX+3, oldY];
		}
	];
  for (let pixel of PIXELS) {
    pixel.x = 4;
  }
  this.stages[0]();
	this.rotate = () => {
	this.ptr %= 2;
	this.stages[this.ptr++]();
    for (var i = 0; i < 4; i++) {
      if (PIXELS[i].x < 1 || PIXELS[i].x > 10) {
        this.rotate();
        return;
      }
    }
	};
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
};
