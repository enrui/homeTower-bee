var io = require('socket.io-client')
var ws_server = '192.168.66.185';
var ws_server_port = '8883';
var device_id = global.cubeStation['id'];
var token = '';

var socket = io.connect('http://'+ ws_server + ':'+ws_server_port, {reconnect: true});

socket.on('connect', function(_socket) {
    console.log('Connected!');
	socket.emit('subscribe', {channel:'ch_'+device_id,deviceId:device_id});
});

socket.on('reconnecting', function(data){
	console.log('reconnecting');
	token = '';
});

socket.on(device_id + '/token/response', function(data) {
    console.log('Token get:'+data);
	token = data;
});

if(typeof(global.cubeStation['sensor_data'][device_id])!='undefined'){
	var temp = global.cubeStation['sensor_data'][device_id]['temp'];
	var rh = global.cubeStation['sensor_data'][device_id]['rh'];	
}else{
	var temp="";
	var rh="";
}
console.log(global.cubeStation['sensor_data']);
socket.emit('/sensor_data/response', {deviceId:device_id,temp:temp,rh:rh});

var sensor_response_interval = setInterval(function(){
	if(token != ''){
		var temp = global.cubeStation['sensor_data'][device_id]['temp'];
		var rh = global.cubeStation['sensor_data'][device_id]['rh'];
		socket.emit('/sensor_data/response', {deviceId:device_id,temp:temp,rh:rh});
	}
}, 30000);




