class canvas {

	constructor(id) {
		this.paint = false;
		this.canvas = document.getElementById(id);
		this.context = this.canvas.getContext("2d");
		this.clickX = new Array();
		this.clickY = new Array();
		this.clickDrag = new Array();
	}

	active(e) {
		if (e.type == "mousedown" || e.type == "mousemove") {
			var mouseX = e.clientX - this.canvas.getBoundingClientRect().left
			var mouseY = e.clientY - this.canvas.getBoundingClientRect().top
		} else { 
			var mouseX = e.touches[0].clientX - this.canvas.getBoundingClientRect().left
			var mouseY = e.touches[0].clientY - this.canvas.getBoundingClientRect().top
		}
		if (e.type == "mousemove" || e.type == "touchmove") {
			if (this.paint) {
				this.addClick(mouseX, mouseY, true);
				this.redraw();
			}} else {
				this.paint = true;
				this.addClick(mouseX, mouseY);
				this.redraw();
			}
		}

	paintOff() {
		this.paint = false;	
	}

	addClick(x, y, dragging) {
		this.clickX.push(x);
		this.clickY.push(y);
		this.clickDrag.push(dragging);
	};

	redraw() {
		this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height); //nettoie le canvas
		this.context.strokeStyle = "#000000";
		this.context.lineJoin = "round";
		this.context.lineWidth = 1;
		for (var i=0; i < this.clickX.length; i++) {
			this.context.beginPath();
			if (this.clickDrag[i] && i){
				this.context.moveTo(this.clickX[i-1], this.clickY[i-1]);
			} else {
				this.context.moveTo(this.clickX[i]-1, this.clickY[i]);
			}
			this.context.lineTo(this.clickX[i], this.clickY[i]);
			this.context.closePath();
			this.context.stroke();
		}
	};

	delete() {
		document.getElementById("delete").style.diplay = "block";
		this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
		this.clickX = new Array();
		this.clickY = new Array();
	};
}
