class sessStorage {

	constructor() {
	}

	actualisation() { 
		if (sessionStorage.getItem("endReservation") > new Date().getTime()) {
  			fad.fade(document.getElementById("infosReservation"));
  			let dureeReservation = Math.trunc((sessionStorage.getItem("endReservation") - new Date().getTime()) / 1000);
  			let secondes = dureeReservation % 60;
 			let minutes = Math.trunc(dureeReservation / 60);
			document.getElementById("textReservation").textContent = "Vous avez actuellement un vélo reservé au " + sessionStorage.getItem("address") + 
   			 ". Celle-ci prendra fin dans " + minutes + " min et " + secondes + " sec.";
		} else {
  			sessionStorage.removeItem("endReservation");
  			sessionStorage.removeItem("address");
  			fad.unfade(document.getElementById("infosReservation"));
		}
	}

	reservation() {
		sessionStorage.setItem("endReservation", new Date().getTime() + 1200000);
  		sessionStorage.setItem("address", mapLyon.actualStation.address);
  		fad.unfade(document.getElementById("reservebox"));
	}
}