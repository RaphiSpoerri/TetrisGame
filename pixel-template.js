const PIXEL_TEMPLATE = function() {
	let x, y, color, dark;
	Object.defineProperties(this, {
		x: {
			set(n) { x = n; },
			get() { return x; }
		},
		y: {
			set(n) { y = n; },
			get() { return y; }
		},
		color: {
			set(n) { color = n; },
			get() { return color; }
		},
		darkColor: {
			set(n) { dark = n; },
			get() { return dark; }
		}
	});
	this.insert = () => {

		var elem = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		elem.setAttribute("x", x);
		elem.setAttribute("y", y);
		elem.setAttribute("height", 15 * 9 / 10);
		elem.setAttribute("width", 15 * 9 / 10);
		elem.setAttribute("fill", color);
		elem.setAttribute("stroke-width", 15 / 10);
		elem.setAttribute("stroke", dark);
		elem.setAttribute("class", `px-${PIXEL_TEMPLATE.count}`);
		SVG.appendChild(elem);
		return {
			node: elem,
			set x(n) {
				this.node.setAttribute("x", (n - 1) * 15);
			},
			get x() {
				return ((this.node.getAttribute("x") / 15) + 1);
			},
			set y(n) {
				this.node.setAttribute("y", (n - 1) * 15);
			},
			get y() {
				return ((this.node.getAttribute("y") / 15) + 1);
			},
			set position([x, y]) {
				this.x = x;
				this.y = y;
			},
			get position() {
				return [this.x, this.y];
			},
			remove() {
				SVG.removeChild(elem);
			}
		};
	}
};

