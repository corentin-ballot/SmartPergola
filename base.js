//Define requires
const express = require('express')
const serialport = require('serialport');

//Store Arduino data
var myData = 0;

//Setup and start web server on :3003
const app = express()
app.get('/', function (req, res) { res.send('Hello World! - Valeur : ' + myData()) });
app.listen(3003, function () { console.log('Example app listening on port 3003!') });

//Setup and start serial port reading
const Readline = serialport.parsers.Readline;
const parser = new Readline();
var mySerialPort = new serialport("/dev/cu.usbmodem1421", {
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControl: false,
});

mySerialPort.pipe(parser);
parser.on('data', function(input) {
  var d=new Date();
  var temps = d.getTime();
        console.log("Data :", input,"\ttimeStamp : ", temps);
        myData = temps;
});
