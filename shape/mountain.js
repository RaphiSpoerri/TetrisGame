const MOUNTAIN = function() {
	const TEMPLATE = new PIXEL_TEMPLATE();
	var [c, d] = COLORS[randint(0, 5)];
	TEMPLATE.color = c;
	TEMPLATE.darkColor = d;
	TEMPLATE.x = TEMPLATE.y = '0';
	const PIXELS = [];
	for(let _ = 0; _ < 4; _++) {
		PIXELS.push(TEMPLATE.insert());
	}
	this.ptr = 1;
	this.stages = [
		function() {
			var old = Math.min(...PIXELS.map(x=>x.y));
			PIXELS[0].position = [4, old+1];
			PIXELS[1].position = [5, old+1];
			PIXELS[2].position = [6, old+1];
			PIXELS[3].position = [5, old];
		},
		function() {
			var old = Math.min(...PIXELS.map(x=>x.y));
			PIXELS[0].position = [5, old];
			PIXELS[1].position = [5, old+1];
			PIXELS[2].position = [5, old+2];
			PIXELS[3].position = [6, old+1];
		},
		function() {
			var old = Math.min(...PIXELS.map(x=>x.y));
			PIXELS[0].position = [4, old];
			PIXELS[1].position = [5, old];
			PIXELS[2].position = [6, old];
			PIXELS[3].position = [5, old+1];
		},
		function() {
			var old = Math.min(...PIXELS.map(x=>x.y));
			PIXELS[0].position = [5, old+1];
			PIXELS[1].position = [6, old];
			PIXELS[2].position = [6, old+1];
			PIXELS[3].position = [6, old+2];
		},
	];
	this.stages[0]();
	this.rotate = () => {
		this.ptr %= 4;
		this.stages[this.ptr++]();
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

