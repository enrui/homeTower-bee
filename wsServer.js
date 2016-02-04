var io = require('socket.io').listen(8888);

io.sockets.on('connection', function (socket) {  
	socket.emit('news', { hello: 'world' });
	socket.on('event', function (data) {
		console.log(data);
	});
	
	socket.on('subscribe', function (data) {
		var device_id=data.deviceId;
		socket.emit(device_id+'/token/response', 'Y@IFKJWELJFY#@0');
	});
	
	//for request and response sensor data 
			
	socket.on('/sensor_data/request_rt', function (data) {
		var did = global.cubeStation['id'];
		var temp = global.cubeStation['sensor_data'][did]['temp'];
		var rh = global.cubeStation['sensor_data'][did]['rh'];
		socket.emit('/sensor_data/response_rt', {deviceId:did,temp:temp,rh:rh});
		
	});
}); 



