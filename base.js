//Define requires
const express = require('express')
const serialport = require('serialport');

//Store Arduino data
var myData = 0;

//Setup and start web server on :3000
const app = express()
app.get('/', function (req, res) { res.send('Hello World! - Valeur : ' + myData) });
app.listen(3000, function () { console.log('Example app listening on port 3000!') });

//Setup and start serial port reading
const Readline = serialport.parsers.Readline;
const parser = new Readline();
var mySerialPort = new serialport("/dev/ttyUSB0", {
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false,
});
mySerialPort.pipe(parser);
parser.on('data', function(input) {
        console.log("Data :", input);
        myData = input;
});
