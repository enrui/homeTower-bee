var sensorLib = require('node-dht-sensor');

var sensor = {
    initialize: function () {
        return sensorLib.initialize(11, 4);
    },
    read: function () {
        var readout = sensorLib.read();
		var did = global.cubeStation['id'];
		global.cubeStation['sensor_data'][did]= new Array();
		global.cubeStation['sensor_data'][did]['temp'] = readout.temperature.toFixed(2);
		global.cubeStation['sensor_data'][did]['rh'] = readout.humidity.toFixed(2);
		
        setTimeout(function () {
            sensor.read();
        }, 5000);
    }
};

if (sensor.initialize()) {
    sensor.read();
} else {
    console.warn('Failed to initialize sensor');
}
