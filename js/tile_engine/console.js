var Console = { //object to create messages (using alert in a game loop will crash your browser)	console: 0, //hold element where messages will be added	hidden: true, 	init: function(){		Console.console = $("<div id='console'>Loading...</br></div>")			.css('width', $('canvas').css('width'))			.insertAfter('canvas')	},	hide: function(){$(Console.console).hide('slow'); Console.hidden=true;},	show: function(){$(Console.console).show('slow'); Console.hidden=false;},	log: function(msg){ //add new message		if(Console.console){			$(Console.console).append('> '+msg+'<br />');		}	}};