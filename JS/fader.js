class fader {

	unfade(element) { 
    var op = 1;
    var timer = setInterval(function () {
	        if (op <= 0.1){
	            clearInterval(timer);
	            element.style.display = 'none';
	        }
	        element.style.opacity = op;
	        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
	        op -= op * 0.1;

    	}, 10);
	}

	fade(element) {

		if (element.style.opacity != 1.08347) {
			var op = 0.1;
	    	element.style.display = 'block';
	    	var timer = setInterval(function () {
		        if (op >= 1){
		            clearInterval(timer);
		        }
		       	element.style.opacity = op;
	        	element.style.filter = 'alpha(opacity=' + op * 100 + ")";
	        	op += op * 0.1;
	    	}, 10);
	    }
	}
}