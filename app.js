var client = 0;
var server = 1;
var white_led_pin=17;
var yallow_led_pin=18;

var glob = require( 'glob' );
var path = require( 'path' );
var Gpio = require('onoff').Gpio;
var w_led = new Gpio(white_led_pin, 'out');
var y_led = new Gpio(yallow_led_pin, 'out');
var sw = 0;

var led_controller = require( './output/led.js' );

setInterval(function() {
	if(sw==1){
		sw=0;
		led_controller.led_switch(w_led,1);
		led_controller.led_switch(y_led,0);
	}else{
		sw=1;
		led_controller.led_switch(w_led,0);
		led_controller.led_switch(y_led,1);
	}
}, 1000);


global.cubeStation = new Array();
global.cubeStation['sensor_data'] = new Array();
global.cubeStation['id'] = 'jpi2-00000001';

glob.sync( './sensor/*.js' ).forEach( function( file ) {
  require( path.resolve( file ) );
});

if(client)
	require( './wsClient.js' );

if(server)
	require( './wsServer.js' );

function release_led() {
    w_led.unexport();
	y_led.unexport();
}

process.on('SIGINT', function(){
	release_led();
});