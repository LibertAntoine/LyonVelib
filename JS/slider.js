var funct, funct2;
class create_slider {

		constructor(domplacement) {	
			this.now_slider = 1;
	        this.placement = domplacement;
	        this.totalSlide = 0;
	        this.conteneur = domplacement.appendChild(document.createElement("div"));
	        this.conteneur.className = "slider";
	        this.conteneur.setAttribute('style', 'perspective:400px;');
	        funct = () => {this.defilRight()};
			funct2 = () => {this.defilLeft()};
		}
        
        addDiapo(imagesarray) {
			for (let i = 0; i < imagesarray.length; i++) {
				this.totalSlide++
				let slideUnit = document.createElement("div");
				slideUnit.className = "diapo" + (this.totalSlide) + " slide";
				let picture = slideUnit.appendChild(document.createElement("img"));
				picture.src = imagesarray[i][0];
				picture.setAttribute('style', 'width:100%; height:100%');
				this.placement.querySelector(".slider").appendChild(slideUnit);
				document.querySelector(".diapo" + this.totalSlide).style.display = "none";
			};				
			this.addSlide(this.now_slider, "slideMiddle");
			if (this.now_slider == 1) {
				this.addSlide(this.totalSlide, "slideLeft");
			} else {
				this.addSlide(this.now_slider - 1, "slideLeft");
			};
			if (this.now_slider == this.totalSlide) {
				this.addSlide(1, "slideRight");
			} else {
				this.addSlide(this.now_slider + 1, "slideRight");
			};
		};

		addDefilAuto(time, direction) {
			if (direction == "left") {
				setInterval(() => {this.defilLeft()}, time);
			} else if (direction == "right") {
				setInterval(() => {this.defilRight()}, time);
			} else { 
				alert("error defilauto - données entrées");}
		};

		addDescrition(contenuHTML) {
			for (var i = 1; i <= this.totalSlide; i++) {			
				document.querySelector(".diapo" + i).innerHTML += '<div class="slideDescription"></div>';
				document.querySelector(".diapo" + i + " .slideDescription").innerHTML = contenuHTML[i-1];	
			}
		}

		addKeyNavigation() {
			document.addEventListener('keydown', (e) => { if (e.key == "ArrowLeft"){ this.defilLeft()}});
			document.addEventListener('keydown', (e) => { if (e.key == "ArrowRight"){ this.defilRight()}});
		}

		addButton() {
			this.placement.appendChild(document.createElement("div"))
			.className = "buttongroup"		
			for (let i = 1; i <= this.totalSlide; i++) {
				this.placement.querySelector(".buttongroup")
					.appendChild(document.createElement("div"))
					.className ="buttonDiapo" + (i) + " fas fa-circle fa-1x"
				this.placement.querySelector(".buttonDiapo" + (i)).addEventListener('click', (e, top = i) => {
					this.placement.querySelectorAll(".fa-circle").forEach((element) => {
						element.classList.replace("far", "fas");});
						e.target.classList.replace("fas","far");
						var tip = e.target.classList[0]
						tip = tip[11]
						var top = 0;
						if (this.now_slider < tip) {
							top = tip - this.now_slider
							while (top) {this.defilRight(150); top--}
						} else if (this.now_slider > tip) {
							top = this.now_slider - tip
							while (top) {this.defilLeft(150); top--}
						}		
					})
				}
			this.placement.querySelector(".buttonDiapo" + this.now_slider).classList.replace("fas","far");
		}

        addSlide(number, position) {

        	document.querySelector(".diapo" + number).style.display = "block";
        	this.placement.querySelector(".diapo" + number).classList.add(position);
        		if (position == "slideLeft") {
        			document.querySelector(".diapo" + number ).addEventListener('click', funct2);
        		} else if (position == "slideRight") {
        			document.querySelector(".diapo" + number).addEventListener('click', funct);
        		}
        	};

        removeSlide(position) {
        	document.querySelector("." + position).style.display = "none";
        	document.querySelector("." + position).removeEventListener('click', funct2)
        	document.querySelector("." + position).removeEventListener('click', funct);			
        	this.placement.querySelector("." + position).classList.remove(position);
        };

        switcher(positionBegin, positionEnd) {
        	this.placement.querySelector("." + positionBegin).classList.add(positionEnd);
        	this.placement.querySelector("." + positionBegin).classList.remove(positionBegin);
        }

		defilRight(time= 1000) {
			this.removeSlide("slideLeft");
			document.querySelector(".slideRight").removeEventListener('click', funct);
			document.querySelector(".slideMiddle").addEventListener('click', funct2);
			document.querySelectorAll(".slide").forEach(function(element) { element.setAttribute('style', 'display:none')});
			this.placement.querySelector(".slideMiddle").setAttribute('style', 'animation: glisseMilieuGauche '+ time +'ms');
			this.placement.querySelector(".slideRight").setAttribute('style', 'animation: glisseDroiteMilieu '+ time +'ms');
			this.switcher("slideMiddle", "slideLeft");
			this.switcher("slideRight", "slideMiddle");
			if (this.now_slider == this.totalSlide) {
				this.now_slider = 1;
				this.addSlide(this.now_slider + 1, "slideRight");
			} else if (this.now_slider == (this.totalSlide - 1)) {
				this.now_slider = this.totalSlide;
				this.addSlide(1,"slideRight");
			} else {
				this.now_slider++
				this.addSlide(this.now_slider + 1,"slideRight");
			}
			this.placement.querySelectorAll(".fa-circle").forEach(function(element) {
			element.classList.replace("far", "fas");});
			this.placement.querySelector(".buttonDiapo" + this.now_slider).classList.replace("fas","far");
		};


		defilLeft(time = 1000) {
			this.removeSlide("slideRight");
			document.querySelector(".slideLeft").removeEventListener('click', funct2);
			document.querySelector(".slideMiddle").addEventListener('click', funct);
			document.querySelectorAll(".slide").forEach(function(element) { element.setAttribute('style', 'display:none')});
			this.placement.querySelector(".slideMiddle").setAttribute('style', 'animation: glisseMilieuDroite '+ time +'ms');
			this.placement.querySelector(".slideLeft").setAttribute('style', 'animation: glisseGaucheMilieu '+ time +'ms');
			this.switcher("slideMiddle", "slideRight");
			this.switcher("slideLeft", "slideMiddle");
			if (this.now_slider == 1) {
				this.now_slider = this.totalSlide;
				this.addSlide(this.now_slider - 1, "slideLeft");
			} else if (this.now_slider == 2) {
				this.now_slider--;
				this.addSlide(this.totalSlide,"slideLeft");
			} else {
				this.now_slider--;
				this.addSlide(this.now_slider - 1,"slideLeft");
			}
			this.placement.querySelectorAll(".fa-circle").forEach(function(element) {
			element.classList.replace("far", "fas");});
			this.placement.querySelector(".buttonDiapo" + this.now_slider).classList.replace("fas","far");
		};
};
