#!/bin/sh
ssh ubuntu@52.66.183.73 
    cd ~/node-app
    git pull origin master
    nvm install v10.11.0
    npm install
    npm install -g nodemon pm2
    npm start
 # pm2 restart ecosystem.config.js
    exit
