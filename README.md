# On the Road
## Table of Contents
[About](#about)
[Details](#details)
[System Requirements](#details)
[Installation](#installation)
[Database](#database)
[Tech Stack](#tech-stack)

## About
**On the Road:** for when you’ve got somewhere to be but nowhere to stay along the way.
### Details
On the Road is a tool for the especially adventurous road tripper who jumps at any chance to sleep outside and under the stars. Travelers upload information for their upcoming road trips, and in turn, On the Road provides them public campsites for each night they’ll be en route based on their desired daily drive time. After a trip has been created, travelers will gain access to a journal associated with that trip where they upload notes or photos as a way to preserve their fond mems.

After all, the journey is the destination & On the Road helps you remember that
## System Requirements:

 - Node version >= 8
 - npm >= 6

## Installation:  

1. Install MySQL v5.7:	[https://dev.mysql.com/doc/refman/5.7/en/installing.html](https://dev.mysql.com/doc/refman/5.7/en/installing.html)

2. Connect to mysql instance and create database
    ``CREATE DATABASE pavement``
	
3. Clone this git repo
	``git clone https://github.com/roadies/onTheRoadAgain.git``
	
4. Change directory to the cloned repo

    ``cd onTheRoadAgain``

5. Install dependencies:

   ``npm install``

6. Bundle source with webpack
    ``npm run build``
    
7. Launch server
	``npm run start``


8. Connect to the site in your browser
	`localhost:8080`
## Database
![Database](https://i.imgur.com/1L1HpUw.png)
## Tech-Stack

![TechStack](https://i.imgur.com/Obalg3C.png)


