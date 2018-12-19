var _func;	
class create_station {

	constructor(object) {
	this.number = object.number;
	this.name = object.name;
	this.lat = object.position.lat;
	this.lng = object.position.lng;
	this.address = object.address;
	this.bikeavailable =  object.available_bikes;
	this.bikeplace = object.available_bikes + "/" + (object.available_bike_stands + object.available_bikes);
	}

	afficheInfos() {	
		var nameStation = /\-[A-ZÂÊÎÔÛÄËÏÖÜÀÇÉÈŒÙ0-9 /\'°.() -]+$/;
		fad.fade(document.getElementById("infosStation"));
		document.getElementById("bikeValaible").textContent = this.bikeplace;
		document.getElementById("title").textContent = nameStation.exec(this.name.toUpperCase());
		document.getElementById("adress").textContent = this.address;
		document.getElementById("noplace").textContent = "";

			if (this.bikeavailable) {
				document.getElementById("reserve").removeEventListener("click", _func);

				_func = () => {
						fad.fade(document.getElementById("reservebox"));
	    			document.getElementById("map").addEventListener('click', () => {
	      				fad.unfade(document.getElementById("reservebox"));
	      				canv.delete();
	    			});
	  				this.changecaret();
	    			window.addEventListener('resize', () => {
	     			this.changecaret();
	    		})}
				document.getElementById("reserve").addEventListener("click", _func) 
				document.getElementById("reserve").classList.replace("button-red", "button-green");
			} else { 
				document.getElementById("reserve").removeEventListener("click", _func);
				_func = () => {
					document.getElementById("noplace").textContent = "Il n'y aucun vélo disponible à cette station.";
				};
				document.getElementById("reserve").addEventListener("click", _func);
				document.getElementById("reserve").classList.replace("button-green", "button-red");
		};}


	changecaret() {		
		if (window.innerWidth < 767) {
   		 	document.querySelector(".fa-caret-right").style.display = "none";
    		document.querySelector(".fa-caret-up").style.display = "inline";
  		} else {
    		document.querySelector(".fa-caret-right").style.display = "inline";
   			document.querySelector(".fa-caret-up").style.display = "none";
  			}
		}
}