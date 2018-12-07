Garduino School Project

#Objective:#

Working in groups to create an automated garden/plant monitoring system using an Arduino micro controller, moisture sensor, light sensor, and therometer sensor with the Johnny-Five Library.

The data that will be outputted from the sensor will be read and graphed on a page using chart.js and Johnny Five library. The graphed data will display the plants moisture, water level measurement, feeding, and will also be trying to have an voice recognition feature based on research we will conduct as a group.


This project uses LED lights and sensors hooked to a Arduino kit that detects a plants light, moisture, and therometer levels and feed data to charts.js.

#To view this project, follow the steps below!#

#Setting up the hardware#

[arduino mega](https://www.arduino.cc/en/Main/ArduinoBoardMega2560) was used for this group Garduino project while using the  (http://johnny-five.io/platform-support/) library that runs the app.

#First steps to wire up this Garduin plant monitoring system is below#

- Download the [Arduino IDE](https://www.arduino.cc/en/Main/Software)
- Plug in your Arduino or Arduino compatible microcontroller via USB
- Open the Arduino IDE, select: File > Examples > Firmata > StandardFirmata
- Click the "Upload" button
- If the upload was successful, the board gets prepared and you can close the Arduino IDE

Connect an LED directly to pin 12 on the bread board.


#Setting up the Project's code#

Clone the repo and npm install the example directory

```
git clone https://github.com/sofroniewn/electron-johnny-five-examples
cd electron-johnny-five-examples/1-led
npm install
npm start

App should be running once npm start is typed.



#If errors occur when trying to set up and get this Garduino app running, refer below#

More information about errors and using the electron with johnny-five library and node-serialport in general, visit [blog post](http://meow.noopkat.com/using-node-serialport-in-an-electron-app/) by [@noopkat](https://github.com/noopkat)

#Test & Run the app#
Once you set up the [hardware](https://github.com/sofroniewn/electron-johnny-five-examples/tree/master/1-led#setting-up-the-hardware) and the [code](https://github.com/sofroniewn/electron-johnny-five-examples/tree/master/1-led#setting-up-the-code) you are now ready to run the app with the terminal command, npm start
