var Readable = require('stream').Readable  
var util = require('util')  
var five = require('johnny-five')

util.inherits(MyStream, Readable)  
function MyStream(opt) {  
  Readable.call(this, opt)
}
MyStream.prototype._read = function() {};  
// hook in our stream
process.__defineGetter__('stdin', function() {  
  if (process.__stdin) return process.__stdin
  process.__stdin = new MyStream()
  return process.__stdin
})

var board = new five.Board();
var valueDiv = document.querySelector("#plantValue");

board.on("ready", function() {
  
  var sensor = new five.Sensor({
  pin: "A0", 
  freq: 250, //emits data events every 250ms
  threshold: 2 //emits change events when the ADC value has changed by +2/-2 
});

sensor.on("change", function() { //could use "data" as well
    var sensorInfo = this.value;
    valueDiv.innerHTML = sensorInfo;


    //console.log(this.scaleTo(0, 10));
    //supposed to range from 0-1023, will have to calibrate
 }); 

 //I notice the sensor didn't fall all the way to 0, but instead stopped at 400

 //Going to need to research and implement a Remap or Map function in Javascript

 });