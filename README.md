# Introduction

This application is build to show some basic options in the Cross Point Access Point API. The API is build on wamp. See  [http://www.wamp.ws](http://www.wamp.ws) for more information about the wamp protocol. 

The endpoint to which you can connect to the CCAP API is: **ws://ccap-ip-address:9000/**

(This will be changed to ws://ccap-ip-address/api/ in the future).

# What to expect

Multiple example scripts are included to demonstrate various commands and events. The data is extracted from the CCAP through the wamp interface. The include examples are:

### counting.html
Display the visitor counting data from the connected antennas in a graph. Listens to visitor counter changed messages and updates adds the new data to this graph.

### alarms.html
Loads the entrance configuration of the system and listens to new tag detected events. When an event is raised the information is written into a list with alarms. The entrance information for the device on which the alarm was raised is included.

### alarmregistration.html
When an alarm event is raised the information is written into a list with alarms. A reason can be selected and this reason will be send back to the CCAP so it can be processed in the CCAP reports.

# Todo list

1. Modify the endpoint to listen on port 80 with a correct URL.

# Run the example

1. Get an Access Point which include the Wamp API (> v7.01)
2. Open one of the html files in a browser
3. Enter the IP address of your Access Point device in the input field
4. Press connect button
