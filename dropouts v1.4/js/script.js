$(document).ready(function() {
	
	// State by state highschool dropout percents declared in object
	// estimated by calculating 50% of non-graduates in 2014 from http://nces.ed.gov/programs/digest/d15/tables/dt15_219.46.asp  
	var dropoutRate = {
		"AL": 7,
		"AK": 14,
		"AZ": 12,
		"AR": 7,
		"CA": 10,

		"CO": 11,
		"CT": 7,
		"DE": 7,
		"DC": 19,
		"FL": 12,

		"GA": 14,
		"HI": 9,
		"ID": 11,
		"IL": 7,
		"IN": 6,

		"IA": 5,
		"KS": 7,
		"KY": 6,
		"LA": 13,
		"ME": 7,

		"MD": 7,
		"MA": 7,
		"MI": 11,
		"MN": 9,
		"MS": 11,

		"MO": 6,
		"MT": 7,
		"NE": 5,
		"NV": 15,
		"NH": 6,

		"NJ": 6,
		"NM": 16,
		"NY": 11,
		"NC": 8,
		"ND": 6,

		"OH": 9,
		"OK": 9,
		"OR": 14,
		"PA": 7,
		"RI": 10,

		"SC": 10,
		"SD": 9,
		"TN": 6,
		"TX": 6,
		"UT": 8,

		"VT": 6,
		"VA": 7,
		"WA": 11,
		"WV": 8,
		"WI": 6,
		"WY": 11
	};

	$('#map').usmap({  
		
		'stateStyles': {
		fill: "#66A88C",
		stroke: "#ffffff",
		"stroke-width": 1,
		"stroke-linejoin": "round",
		scale: [1, 1]
	},

	'stateHoverStyles': {
		fill: "#D5EDE2",
		stroke: "#FA7C92",
		scale: [1, 1]
	},

	'click' : function(event, data) {
		

		var state = (data.name);

		$('#state')
		.text(state)

		$('#average')
		.text(dropoutRate[state] + "%")
    	
		.stop()

		$("#myModal").modal({backdrop: false}) //removes dark overlay on modal popup
		$("#myModal").modal() //trigger modal popup
		$(document).click(function(){ //hide modal when user clicks
	        $("#myModal").modal("hide");
	    });
	},

	});

	$('#map2').usmap({
	    'stateStyles': {
	      fill: '#025', 
	      "stroke-width": 1,
	      'stroke' : '#036'
	    },
	    'stateHoverStyles': {
	      fill: 'teal'
	    },
	    
	    'click' : function(event, data) {
	      $('#alert')
	        .text('Click '+data.name+' on map 2')
	        .stop()
	        .css('backgroundColor', '#af0')
	        .animate({backgroundColor: '#ddd'}, 1000);
	    }
	 });	  
});
	
setTimeout(function() {
    $('.map-pop').fadeOut(2000);
}, 5000);


// canvas panorama: 
//_________________

var img = new Image();

// User Variables - customize these to change the image being scrolled, its
// direction, and the speed.

img.src = 'http://i.imgur.com/VYb3BfA.jpg';
var CanvasXSize = 1900;
var CanvasYSize = 860;
var speed = 80; //lower is faster
var scale = 1.05;
var y = -4.5; //vertical offset

// Main program

var dx = 0.75;
var imgW;
var imgH;
var x = 0;
var clearX;
var clearY;
var ctx;

img.onload = function() {
    imgW = img.width*scale;
    imgH = img.height*scale;
    if (imgW > CanvasXSize) { x = CanvasXSize-imgW; } // image larger than canvas
    if (imgW > CanvasXSize) { clearX = imgW; } // image larger than canvas
    else { clearX = CanvasXSize; }
    if (imgH > CanvasYSize) { clearY = imgH; } // image larger than canvas
    else { clearY = CanvasYSize; }
    //Get Canvas Element
    ctx = document.getElementById('canvas').getContext('2d');
    //Set Refresh Rate
    return setInterval(draw, speed);
}

function draw() {
    //Clear Canvas
    ctx.clearRect(0,0,clearX,clearY);
    //If image is <= Canvas Size
    if (imgW <= CanvasXSize) {
        //reset, start from beginning
        if (x > (CanvasXSize)) { x = 0; }
        //draw aditional image
        if (x > (CanvasXSize-imgW)) { ctx.drawImage(img,x-CanvasXSize+1,y,imgW,imgH); }
    }
    //If image is > Canvas Size
    else {
        //reset, start from beginning
        if (x > (CanvasXSize)) { x = CanvasXSize-imgW; }
        //draw aditional image
        if (x > (CanvasXSize-imgW)) { ctx.drawImage(img,x-imgW+1,y,imgW,imgH); }
    }
    //draw image
    ctx.drawImage(img,x,y,imgW,imgH);
    //amount to move
    x += dx;
}



