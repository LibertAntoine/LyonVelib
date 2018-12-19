class create_map {

	constructor(id, lat, lng, zoom) {
		this.idLocation = id;
		this.lat = lat;
		this.lng = lng;
		this.zoom = zoom;
		this.actualStation = null;
		this.map = new google.maps.Map(document.getElementById(id), {
          center: {lat: lat, lng: lng},
          zoom: zoom});
		};


    addMarkerJCD(contratJCD, apiKey) {
      	this.contrat = contratJCD;
      	this.api = apiKey; 
		this.ajaxGET("https://api.jcdecaux.com/vls/v1/stations?contract="+ contratJCD + "&apiKey=" + apiKey, "createMarker");		
    };


	ajaxGET(url, methode, param = null) {
		var listStations = new XMLHttpRequest();
		listStations.open("GET", url);
		listStations.send(url); 
		listStations.addEventListener("load", () => {
			if (listStations.status == 200) {
				if (methode == "createMarker") {this.createMarker(listStations.responseText, param);
				} else if (methode == "actualisation") {this.actualisation(listStations.responseText, param);}
			} else {
				console.error(listStations.status + " " + listStations.statusText);
			}
		});
	};

	createMarker(infos, map) {
		let objectStation = JSON.parse(infos);
		let markersArray = [];
		objectStation.forEach((object) => {
			let station = new create_station(object);
			let marker = new google.maps.Marker({
	        	position: {lat: station.lat, lng: station.lng},
	        	map: map,
	       	 	title: station.address.toUpperCase(),
	        	number: station.number,
	    	});	
			marker.addListener('click', () => {
		 		this.ajaxGET("https://api.jcdecaux.com/vls/v1/stations/" + station.number + "?contract="+ this.contrat + "&apiKey=" + this.api, "actualisation", station);	
			});
		markersArray.push(marker);
		});
		let markerCluster = new MarkerClusterer(this.map, markersArray,
	    {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m'});
	};

	actualisation(infos, station) {
		let objectSt = JSON.parse(infos);
		station.bikeavailable =  objectSt.available_bikes;
		station.bikeplace = objectSt.available_bikes + "/" + (objectSt.available_bike_stands + objectSt.available_bikes);
		station.afficheInfos();
		this.actualStation = station;
	}
};












	




		
