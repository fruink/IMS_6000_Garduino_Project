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


//var five = require("johnny-five");
//var board = new five.Board();

//board.on("ready", function() {
  //var led = new five.Led(13);
  //led.blink(500);
//});



var photoresistor;
var board = new five.Board();
var valueDiv = document.querySelector("#moistureValue");
var lightDiv = document.querySelector("#lightValue");
var tempDiv = document.querySelector('#tempValue');


//MOISTURE SENSOR//

board.on("ready", function() {
  
  var sensor = new five.Sensor({
  pin: "A0", 
  freq: 2500, //emits data events every 250ms
  threshold: 3 //emits change events when the ADC value has changed by +2/-2 
});

sensor.on("change", function() { //could use "data" as well
    var sensorInfo = (this.scaleTo(5, 0));
    valueDiv.innerHTML = sensorInfo;
    //console.log(this.scaleTo(0, 10));
    //supposed to range from 0-1023, will have to calibrate
    createMoistChart(sensorInfo);
 });
 });

//MOISTURE CHART//
function createMoistChart(value){
  var ctx = document.getElementById("moistChart");
var chart = new Chart(ctx, {
  type: 'doughnut',
  options: {
    cutoutPercentage: 75,
    rotation: 1 * Math.PI,
    circumference: 1 * Math.PI
  },
  data: {
    datasets: [{
        backgroundColor: [
          "#507894",
          "#ccc"
        ],
        data: [value, 5 - value], //NEED TO INPUT SENSOR DATA HERE
       
      }],
    labels: ['Moisture']
  }
});
}


//LIGHT SENSOR// 
board.on("ready", function(){

  photoresistor = new five.Sensor({
  pin: "A2",
  freq: 2500,
  threshold: 3
  });

var led = new five.Led.RGB({
  pins: {red: 6, green: 5, blue: 3}
});


  function changeLight() {
    // console.log("I am running");
    var newblue = (this.value * 0.1) - 100;
    var newred = (this.value * 0.3) - 75;
    var newgreen = (this.value * 0.2) - 100;

    var lightInfo = (this.scaleTo(10, 0));
    lightDiv.innerHTML = lightInfo;
    //console.log(this.value);

    led.color([newred, newblue, newgreen]);

    createLightChart(lightInfo);
  }

  photoresistor.on("data", changeLight);

});

//LIGHT CHART//
function createLightChart(value) {
var ctx = document.getElementById("lightChart");
var chart = new Chart(ctx, {
  type: 'doughnut',
  options: {
    cutoutPercentage: 75,
    rotation: 1 * Math.PI,
    circumference: 1 * Math.PI
  },
  data: {
    datasets: [{
        backgroundColor: [
          "#9A937E",
          "#ccc"
        ],
        data: [value, 10 - value], //NEED TO INPUT SENSOR DATA HERE
       
      }],
    labels: ['Light']
  }
});
}



//THERMOMETER SENSOR//
board.on("ready", function(){
  var temperature = new five.Thermometer({
    controller: "LM35",
    pin: "A1",
    freq: 2000,
    threshold: 7  
  });

  
    temperature.on("change", function() {
    //console.log(this.celsius + "°C");
    var tempInfo = (this.celsius + "°C");
    tempDiv.innerHTML = tempInfo;

 createTempChart(this.celsius);
 //createChart(tempInfo) use variable for other examples
  });

});



//THERMOMETER CHART/
function createTempChart (value){

var ctx = document.getElementById("tempChart");
var chart = new Chart(ctx, {
  type: 'doughnut',
  options: {
    cutoutPercentage: 75,
    rotation: 1 * Math.PI,
    circumference: 1 * Math.PI
  },
  data: {
    datasets: [{
        backgroundColor: [
          "#4c4c4b",
          "#ccc"
        ],
        data: [value, 100 - value], //NEED TO INPUT SENSOR DATA HERE
       
      }],
    
    labels: ['Temperature']
  }

});
}

//We tried to have three doughnut data sets nest in each other, with each doughtnut displaying one sensor data. We were successful taht with the following code however we couldn't figure out how to individually label them.
//  data: {
  //  labels: ["My Succulent"],
  //datasets: [{
  //      backgroundColor: [
  //        "red"
  //      ],
  //      data: [25, 75]
  //    },
  //    {
    
  //      backgroundColor: [
  //        "blue"
  //      ],
  //      data: [20, 80]
  //    },
  //    {

  //    backgroundColor: [
  //        "yellow"
  //      ],
  //      data: [10, 90]
  //    }
  //  ]
  //}
