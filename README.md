# Project Architcture 
![Captureasd](https://user-images.githubusercontent.com/53253487/87952457-6daea780-cadc-11ea-8d76-fef07225e8ae.JPG)

# Project Description
#### Basically this project have separated into two part, one part act as a temperature sensor to store patient data to Firebase, another part is admin console that display the data into a chart. For this repositories is the admin console that used to display the data into a chart.

# Prerequisition
#### Not much thing required, you can use cmd prompt to run this program, but suggested to download VSCode to run this program (https://code.visualstudio.com/), VSCode provided interface that help for easy to edit the coding (all file are managed nicely), able to straight commit the folder to github easily, it able to check the different to our last commited folder, and it also provided a internal terminal for us to run this program.

# To run this program
#### Step 1 : Suggested - Download VSCode (https://code.visualstudio.com/)
#### Step 2 : Clone this program (example location : desktop)
#### Step 3 : Go to this folder, right click and look for "Open with Code"
![Capturex1](https://user-images.githubusercontent.com/53253487/87954705-4dccb300-cadf-11ea-9fe6-a19f6932152d.JPG)
#### Step 4 : After opened VSCode look for the top menu bar and click new terminal
![topmenu](https://user-images.githubusercontent.com/53253487/87954897-8f5d5e00-cadf-11ea-9542-7ad31f6c0459.JPG)
#### Step 5 : Next, enter "npm install"
#### Step 6 : After install, enter "npm start"
#### After successfully loaded, you see the link (localhost:4200), you can CTRL + click the link on the terminal or enter the link into browser(Google Chrome)

# Project Screenshot
#### All of the data on the first are dummy data 
![Capturecv](https://user-images.githubusercontent.com/53253487/87956037-1ced7d80-cae1-11ea-9190-05f90e7bae44.JPG)

#### To view the real time patient temperature chart, go to side menu and click on charts
![charts](https://user-images.githubusercontent.com/53253487/87956394-94231180-cae1-11ea-82e3-055cd555cb9c.JPG)

#### Charts interface:
![Capturect](https://user-images.githubusercontent.com/53253487/87956602-d4828f80-cae1-11ea-9b88-8b89a326da5f.JPG)
![CapturebElow](https://user-images.githubusercontent.com/53253487/87957007-4eb31400-cae2-11ea-9dc3-32384c9233f4.JPG)
#### Note: If the patients temperature is higher or equal to 37 Cel, it will become red colour, below 37 Cel will display as blue

### Benefit
##### This project are easy to modify
##### The interface are simple and nice 
##### Able to set in dark mode

### Limitation 
##### There are some bug while populating the graph when the data updated in firebase, need to constantly point to the chart only can trigger the chart to update. There are no problem if using local random number to populate the chart, it able to update automatically.

### Future work
##### Think to use other database(SQL server) to populate the chart
##### Create other useful chart
