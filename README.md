# Introduction

This application is build to show some basic options in the Cross Point Access Point API. The API is build on wamp. See  [http://www.wamp.ws](http://www.wamp.ws) for more information about the wamp protocol. 

The endpoint to which you can connect to the CCAP is: ws://<ccap-ip>:9000/ 
(This will be changed to ws://<ccap-ip>/api/ is the future).

# What to expect

This example shows the incoming visitors in a graph. The data is extracted from the CCAP through the wamp interface. The application listens for counter changed events and the graph will be updated if there are new incoming visitors.

# Todo list

1. Modify the endpoint to listen on port 80 with a correct URL.
2. Update the example to show alarm verification.
3. Update the example to show alarm countings.
4. Create a way to enter the CCAP IP in the application and not through code file
5. Add testing

# Needed tools

To build and run this example you need the following tools:

1. Node.js ([Installation instructions](http://nodejs.org/))
2. Grunt ([Installation instructions](http://gruntjs.com/getting-started))
3. Bower ([Installation instructions](http://bower.io/))
4. Git ([Installation instructions](http://git-scm.com/)

# Run the example

1. Download and install files in this repository.
2. Go to your command line to the directory with the repository files
3. Run 'npm install' to install all node packages
4. Run 'bower install' to install all bower packages
5. Modify the ip on the line 'var ip = '192.168.70.144' in the file app/scripts/app.js to match your IP address.
5. Run 'grunt serve' to run the example
6. Open your browser and open http://127.0.0.1:9000/ to view the example
